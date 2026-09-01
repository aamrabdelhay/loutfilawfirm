"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { applyAction } from "@/app/actions/apply";
import { isEmail, isPhone, cn } from "@/lib/utils";
import { FieldLabel, Input, Select, Textarea, FieldError } from "@/components/ui/field";
import { Plus, Trash2, Check } from "lucide-react";

type Mode = "training" | "job";
type Experience = { organization: string; duration: string; description: string };

const EMPTY_EXP: Experience = { organization: "", duration: "", description: "" };

export function ApplicationForm({ content = {} }: { content?: Record<string, string> }) {
  const t = useTranslations("careers");
  const [mode, setMode] = useState<Mode>("training");

  const label = (key: string, fallback: string) => (content && content[key]) || fallback;
  const [fullName, setFullName] = useState("");
  const [university, setUniversity] = useState("");
  const [academicYear, setAcademicYear] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [motivation, setMotivation] = useState("");
  const [experiences, setExperiences] = useState<Experience[]>([EMPTY_EXP]);
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState("");

  const setExp = (idx: number, key: keyof Experience, value: string) => {
    setExperiences((prev) => {
      const next = [...prev];
      next[idx] = { ...next[idx], [key]: value };
      return next;
    });
  };

  const addExp = () => {
    if (experiences.length < 10) {
      setExperiences((prev) => [...prev, EMPTY_EXP]);
    }
  };

  const removeExp = (idx: number) => {
    setExperiences((prev) => {
      const next = prev.filter((_, i) => i !== idx);
      return next.length ? next : [EMPTY_EXP];
    });
  };

  const valid = useMemo(() => {
    const nameOk = fullName.trim().length >= 2;
    const uniOk = university.trim().length >= 2;
    const yearOk = mode !== "training" || academicYear.trim().length > 0;
    const phoneOk = isPhone(phone);
    const emailOk = isEmail(email);
    const expsOk =
      experiences.length > 0 &&
      experiences.every((e) => e.organization.trim().length >= 2 && e.duration.trim().length >= 2 && e.description.trim().length >= 2);
    return { nameOk, uniOk, yearOk, phoneOk, emailOk, expsOk };
  }, [fullName, university, academicYear, phone, email, experiences, mode]);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!valid.nameOk) e.fullName = t("invalidResume");
    if (!valid.uniOk) e.university = t("invalidResume");
    if (!valid.yearOk) e.academicYear = t("invalidResume");
    if (!valid.phoneOk) e.phone = t("invalidResume");
    if (!valid.emailOk) e.email = t("invalidResume");
    if (!valid.expsOk) e.experience = t("invalidResume");
    if (!consent) e.consent = t("invalidResume");
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    setServerError("");
    if (!validate()) return;
    setSubmitting(true);
    const result = await applyAction({
      type: mode.toUpperCase(),
      fullName,
      university,
      academicYear: mode === "training" ? academicYear : undefined,
      phone,
      email,
      linkedin: linkedin || undefined,
      motivation: motivation || undefined,
      experiences,
      consent,
      website
    });
    setSubmitting(false);
    if (result.ok) {
      setSuccess(true);
    } else {
      setServerError(t("error"));
    }
  };

  if (success) {
    return (
      <div className="glass-card p-10 md:p-14 text-center">
        <div className="mx-auto h-14 w-14 rounded-full bg-[rgba(79,155,114,0.12)] text-[var(--success)] flex items-center justify-center">
          <Check size={26} />
        </div>
            <h2 className="mt-6 font-serif text-3xl">
              {label("careers.success", t("success"))}
            </h2>
        <p className="mt-4 text-[var(--muted)]">{t("training.subtext")}</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate>
      {/* Tabs */}
      <div className="inline-flex rounded-full border border-[rgba(22,26,32,0.16)] p-1 mb-8" role="tablist" aria-label={t("title")}>
        {(["training", "job"] as Mode[]).map((m) => (
          <button
            key={m}
            type="button"
            role="tab"
            aria-selected={mode === m}
            onClick={() => {
              setMode(m);
              setErrors({});
              setServerError("");
            }}
            className={cn(
              "rounded-full px-6 py-3 text-sm font-medium transition-colors",
              mode === m ? "bg-[var(--navy)] text-white" : "text-[var(--muted)] hover:text-[var(--ink)]"
            )}
          >
            {t(`tabs.${m}`)}
          </button>
        ))}
      </div>

            <div className="mb-8 max-w-2xl">
              <h2 className="font-serif text-3xl">
                {label(`careers.${mode}.heading`, t(`${mode}.heading`))}
              </h2>
              <p className="mt-3 text-[var(--muted)]">
                {label(`careers.${mode}.subtext`, t(`${mode}.subtext`))}
              </p>
            </div>

      <div className="glass-card p-6 md:p-10">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="md:col-span-2">
            <FieldLabel htmlFor="fullName" required valid={valid.nameOk} invalid={!valid.nameOk}>
              {t(`${mode}.fullName`)}
            </FieldLabel>
            <Input
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              invalid={!valid.nameOk}
              valid={valid.nameOk}
              autoComplete="name"
            />
            <FieldError>{errors.fullName}</FieldError>
          </div>

          <div>
            <FieldLabel htmlFor="university" required valid={valid.uniOk} invalid={!valid.uniOk}>
              {t(`${mode}.university`)}
            </FieldLabel>
            <Input
              id="university"
              value={university}
              onChange={(e) => setUniversity(e.target.value)}
              invalid={!valid.uniOk}
              valid={valid.uniOk}
            />
            <FieldError>{errors.university}</FieldError>
          </div>

          {mode === "training" ? (
            <div>
              <FieldLabel htmlFor="academicYear" required valid={valid.yearOk} invalid={!valid.yearOk}>
                {t("training.academicYear")}
              </FieldLabel>
              <Select
                id="academicYear"
                value={academicYear}
                onChange={(e) => setAcademicYear(e.target.value)}
                invalid={!valid.yearOk}
                valid={valid.yearOk}
              >
                <option value="">—</option>
                {(["first", "second", "third", "fourth", "graduate", "postgraduate"] as const).map((y) => (
                  <option key={y} value={y}>
                    {t(`training.yearOptions.${y}`)}
                  </option>
                ))}
              </Select>
              <FieldError>{errors.academicYear}</FieldError>
            </div>
          ) : null}

          <div>
            <FieldLabel htmlFor="phone" required valid={valid.phoneOk} invalid={!valid.phoneOk}>
              {t(`${mode}.phone`)}
            </FieldLabel>
            <Input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              invalid={!valid.phoneOk}
              valid={valid.phoneOk}
              autoComplete="tel"
            />
            <FieldError>{errors.phone}</FieldError>
          </div>

          <div>
            <FieldLabel htmlFor="email" required valid={valid.emailOk} invalid={!valid.emailOk}>
              {t(`${mode}.email`)}
            </FieldLabel>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              invalid={!valid.emailOk}
              valid={valid.emailOk}
              autoComplete="email"
            />
            <FieldError>{errors.email}</FieldError>
          </div>

          <div>
            <FieldLabel htmlFor="linkedin">{t(`${mode}.linkedin`)}</FieldLabel>
            <Input
              id="linkedin"
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
              autoComplete="url"
            />
          </div>

          <div className="md:col-span-2">
            <FieldLabel htmlFor="motivation">{t(`${mode}.motivation`)}</FieldLabel>
            <Textarea
              id="motivation"
              value={motivation}
              onChange={(e) => setMotivation(e.target.value)}
              className="min-h-[140px]"
            />
          </div>
        </div>

        {/* Experience builder */}
        <div className="mt-10">
          <div className="flex items-center justify-between gap-4">
            <h3 className="font-serif text-2xl">{t(`${mode}.experience`)}</h3>
            <button
              type="button"
              onClick={addExp}
              disabled={experiences.length >= 10}
              className="btn-outline min-h-[42px] px-4 py-2 text-sm disabled:opacity-50"
            >
              <Plus size={15} /> {t("builder.add")}
            </button>
          </div>
          <FieldError>{errors.experience}</FieldError>
          <div className="mt-4 space-y-5">
            {experiences.map((exp, i) => (
              <div key={i} className="rounded-[var(--radius-small)] border border-[rgba(22,26,32,0.12)] p-5 md:p-6 bg-white/50">
                <div className="flex items-center justify-between gap-3 mb-4">
                  <span className="font-serif text-lg text-[var(--burgundy)]">{t(`builder.initial`)} {experiences.length > 1 ? String(i + 1) : ""}</span>
                  {experiences.length > 1 ? (
                    <button type="button" onClick={() => removeExp(i)} className="inline-flex items-center gap-2 text-sm text-[var(--error)] hover:underline">
                      <Trash2 size={14} /> {t("builder.remove")}
                    </button>
                  ) : null}
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium mb-2">{t("builder.organization")}</label>
                    <Input
                      value={exp.organization}
                      onChange={(e) => setExp(i, "organization", e.target.value)}
                      invalid={exp.organization.trim().length < 2}
                      valid={exp.organization.trim().length >= 2}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">{t("builder.duration")}</label>
                    <Input
                      value={exp.duration}
                      onChange={(e) => setExp(i, "duration", e.target.value)}
                      invalid={exp.duration.trim().length < 2}
                      valid={exp.duration.trim().length >= 2}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">{t("builder.description")}</label>
                    <Textarea
                      value={exp.description}
                      onChange={(e) => setExp(i, "description", e.target.value)}
                      className="min-h-[90px]"
                      invalid={exp.description.trim().length < 2}
                      valid={exp.description.trim().length >= 2}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Privacy + consent */}
        <div className="mt-10 rounded-[var(--radius-small)] border border-[rgba(22,26,32,0.12)] bg-[rgba(247,245,240,0.7)] p-5 md:p-6">
          <h4 className="font-serif text-xl">
            {label("careers.privacy.title", t("privacy.title"))}
          </h4>
          <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
            {label("careers.privacy.body", t("privacy.body"))}
          </p>
          <label className="mt-5 flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-1 h-5 w-5 rounded border-[rgba(22,26,32,0.2)]"
              aria-invalid={Boolean(errors.consent)}
            />
            <span className="text-sm text-[var(--ink)]">
              {label("careers.consent", t("consent"))}
            </span>
          </label>
          <FieldError>{errors.consent}</FieldError>
        </div>

        {/* Honeypot */}
        <div className="sr-only" aria-hidden="true">
          <label htmlFor="website">Website</label>
          <input id="website" name="website" value={website} onChange={(e) => setWebsite(e.target.value)} tabIndex={-1} autoComplete="off" />
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {serverError ? <p role="alert" className="text-sm text-[var(--error)]">{serverError}</p> : <span />}
          <button type="submit" className="btn-solid" disabled={submitting}>
            {submitting ? t("submitting") : label("careers.submit", t("submit"))}
          </button>
        </div>
      </div>
    </form>
  );
}
