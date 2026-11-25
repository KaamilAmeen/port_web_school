"use client";

import { useState } from "react";
import type { z } from "zod";

export type SubmissionStatus = "idle" | "submitting" | "success" | "error";

type FieldErrors<T> = Partial<Record<keyof T, string>>;

type FormspreeErrorItem = { field?: string; message?: string };

function readErrors(payload: unknown): { fields: FieldErrors<Record<string, string>>; form: string[] } {
  const fields: FieldErrors<Record<string, string>> = {};
  const form: string[] = [];

  if (!payload || typeof payload !== "object" || !("errors" in payload)) {
    return { fields, form };
  }

  const errors = (payload as { errors: unknown }).errors;
  if (!Array.isArray(errors)) return { fields, form };

  for (const item of errors) {
    if (!item || typeof item !== "object") continue;
    const error = item as FormspreeErrorItem;
    const message = error.message ?? "This field is invalid.";
    if (error.field && typeof error.field === "string") {
      fields[error.field] = message;
    } else {
      form.push(message);
    }
  }

  return { fields, form };
}

export function useFormspree<T extends object>({
  schema,
  endpoint,
  toPayload,
  successMessage,
}: {
  schema: z.ZodType<T>;
  endpoint: string | null;
  toPayload: (values: T) => Record<string, string>;
  successMessage: string;
}) {
  const [status, setStatus] = useState<SubmissionStatus>("idle");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors<T>>({});

  async function submit(values: T): Promise<boolean> {
    if (status === "submitting") return false;

    const validation = schema.safeParse(values);
    if (!validation.success) {
      const nextErrors: FieldErrors<T> = {};
      for (const issue of validation.error.issues) {
        const field = issue.path[0];
        if (typeof field === "string" && !(field in nextErrors)) {
          nextErrors[field as keyof T] = issue.message;
        }
      }
      setFieldErrors(nextErrors);
      setStatus("error");
      setFeedback("Please correct the highlighted fields and try again.");
      return false;
    }

    setFieldErrors({});

    if (!endpoint) {
      setStatus("error");
      setFeedback(
        "This form is not configured yet. Add the Formspree form ID to the environment variables.",
      );
      return false;
    }

    setStatus("submitting");
    setFeedback(null);

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _gotcha: "", ...toPayload(validation.data) }),
      });

      const payload: unknown = await response.json().catch(() => null);

      if (!response.ok) {
        const { fields, form } = readErrors(payload);
        const serverErrors: FieldErrors<T> = {};
        for (const [field, message] of Object.entries(fields)) {
          if (message) serverErrors[field as keyof T] = message;
        }
        setFieldErrors(serverErrors);
        setStatus("error");
        setFeedback(
          form.length > 0
            ? form.join(" ")
            : "Formspree could not accept your submission. Please try again shortly.",
        );
        return false;
      }

      setStatus("success");
      setFeedback(successMessage);
      return true;
    } catch (error) {
      setStatus("error");
      setFeedback(
        error instanceof Error && error.name === "TypeError"
          ? "The submission could not be sent. Check your connection and try again."
          : "Something went wrong. Please try again shortly.",
      );
      return false;
    }
  }

  function reset() {
    setStatus("idle");
    setFeedback(null);
    setFieldErrors({});
  }

  return { status, feedback, fieldErrors, submit, reset };
}
