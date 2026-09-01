import { ReactNode, InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function FieldLabel({
  children,
  htmlFor,
  required,
  valid = false,
  invalid = false
}: {
  children: ReactNode;
  htmlFor?: string;
  required?: boolean;
  valid?: boolean;
  invalid?: boolean;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="flex items-center gap-2 text-sm font-medium text-[var(--ink)] mb-2"
    >
      <span
        aria-hidden="true"
        className={cn(
          "status-dot",
          invalid ? "is-invalid" : valid ? "is-valid" : ""
        )}
      />
      {children}
      {required ? (
        <span className="sr-only">*</span>
      ) : null}
    </label>
  );
}

export function Input({
  className,
  invalid,
  valid,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { invalid?: boolean; valid?: boolean }) {
  return (
    <input
      className={cn(
        "field",
        invalid && "is-invalid",
        valid && "is-valid",
        className
      )}
      {...props}
    />
  );
}

export function Select({
  className,
  invalid,
  valid,
  children,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement> & { invalid?: boolean; valid?: boolean }) {
  return (
    <select
      className={cn(
        "field",
        invalid && "is-invalid",
        valid && "is-valid",
        className
      )}
      {...props}
    >
      {children}
    </select>
  );
}

export function Textarea({
  className,
  invalid,
  valid,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement> & { invalid?: boolean; valid?: boolean }) {
  return (
    <textarea
      className={cn(
        "field",
        "min-h-[120px] resize-y",
        invalid && "is-invalid",
        valid && "is-valid",
        className
      )}
      {...props}
    />
  );
}

export function FieldError({ children }: { children?: ReactNode }) {
  if (!children) return null;
  return (
    <p role="alert" className="mt-2 text-sm text-[var(--error)]">
      {children}
    </p>
  );
}
