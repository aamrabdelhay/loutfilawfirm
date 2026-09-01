"use server";

import { z } from "zod";
import { headers } from "next/headers";
import { createApplication } from "@/lib/db/repo";
import { isEmail, isPhone } from "@/lib/utils";

const experienceSchema = z.object({
  organization: z.string().trim().min(2, "Organization is required"),
  duration: z.string().trim().min(2, "Duration is required"),
  description: z.string().trim().min(2, "Description is required")
});

const baseSchema = z.object({
  fullName: z.string().trim().min(2),
  university: z.string().trim().min(2),
  phone: z.string().trim().refine(isPhone, "Invalid phone number"),
  email: z.string().trim().refine(isEmail, "Invalid email address"),
  linkedin: z.string().trim().optional(),
  motivation: z.string().trim().optional()
});

const trainingSchema = baseSchema.extend({
  type: z.literal("TRAINING"),
  academicYear: z.string().trim().min(1),
  experiences: z.array(experienceSchema).min(1).max(10)
});

const jobSchema = baseSchema.extend({
  type: z.literal("JOB"),
  academicYear: z.string().optional(),
  experiences: z.array(experienceSchema).min(1).max(10)
});

const inputSchema = z.discriminatedUnion("type", [trainingSchema, jobSchema]);

// Simple in-process rate limit. Per-process is enough to stop casual abuse;
// production deployments should add a shared limiter (e.g. Redis/Upstash).
const buckets = new Map<string, { count: number; reset: number }>();
const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 5;

function rateLimited(key: string) {
  const now = Date.now();
  const bucket = buckets.get(key);
  if (!bucket || bucket.reset < now) {
    buckets.set(key, { count: 1, reset: now + RATE_WINDOW_MS });
    return false;
  }
  bucket.count += 1;
  return bucket.count > RATE_MAX;
}

export type ApplyResult = { ok: true } | { ok: false; error: string };

export async function applyAction(raw: {
  type: string;
  fullName: string;
  university: string;
  academicYear?: string;
  phone: string;
  email: string;
  linkedin?: string;
  motivation?: string;
  experiences: Array<{ organization: string; duration: string; description: string }>;
  consent: boolean;
  website: string;
}): Promise<ApplyResult> {
  // Honeypot: a filled hidden field means a bot, not a human.
  if (raw.website && raw.website.trim().length > 0) {
    return { ok: true };
  }
  if (!raw.consent) {
    return { ok: false, error: "consent" };
  }

  const headerList = await headers();
  const ip =
    headerList.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headerList.get("x-real-ip") ||
    "unknown";
  if (rateLimited(ip)) {
    return { ok: false, error: "rate" };
  }

  const parsed = inputSchema.safeParse(raw);
  if (!parsed.success) {
    return { ok: false, error: "invalid" };
  }

  createApplication({
    type: parsed.data.type as "TRAINING" | "JOB",
    fullName: parsed.data.fullName,
    university: parsed.data.university,
    academicYear: parsed.data.type === "TRAINING" ? parsed.data.academicYear || "" : null,
    phone: parsed.data.phone,
    email: parsed.data.email,
    linkedin: parsed.data.linkedin || null,
    motivation: parsed.data.motivation || null,
    experiences: parsed.data.experiences.map((e) => ({
      organization: e.organization,
      duration: e.duration,
      description: e.description
    }))
  });

  return { ok: true };
}
