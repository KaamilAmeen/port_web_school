"use client";

import { useRef, useState } from "react";
import { useSubmit } from "@formspree/react";
import type { z } from "zod";

export type SubmissionStatus = "idle" | "submitting" | "success" | "error";

type FieldErrors<T> = Partial<Record<keyof T, string>>;

type FormspreePayload = Record<string, string>;

/**
 * Zod validates before Formspree is contacted. Once the data is valid, the
 * request itself is sent by `@formspree/react`, and the library's structured
 * result is mapped back onto the existing accessible field/general error UI.
 */
export function useFormspree<T extends object>({
  schema,
  formKey,
  toPayload,
  successMessage,
}: {
  schema: z.ZodType<T>;
  formKey: string | null;
  toPayload: (values: T) => FormspreePayload;
  successMessage: string;
}) {
  const [status, setStatus] = useState<SubmissionStatus>("idle");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors<T>>({});
  const submittingRef = useRef(false);

  // useSubmit requires a non-empty key at render time. The guard in submit()
  // prevents any request from being sent when no real ID is configured.
  const submitToFormspree = useSubmit<FormspreePayload>(
    formKey ?? "unconfigured-form",
  );

  async function submit(values: T): Promise<boolean> {
    if (submittingRef.current) return false;

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

    if (!formKey) {
      setStatus("error");
      setFeedback(
        "This form is temporarily unavailable. Please contact the school by email.",
      );
      return false;
    }

    submittingRef.current = true;
    setStatus("submitting");
    setFeedback(null);

    try {
      const result = await submitToFormspree(toPayload(validation.data));

      if (result.kind === "success") {
        setStatus("success");
        setFeedback(successMessage);
        return true;
      }

      const serverErrors: FieldErrors<T> = {};
      for (const [field, errors] of result.getAllFieldErrors()) {
        const firstError = errors[0];
        if (typeof field === "string" && firstError) {
          serverErrors[field as keyof T] = firstError.message;
        }
      }

      const formMessages = result
        .getFormErrors()
        .map((error) => error.message)
        .filter(Boolean);

      setFieldErrors(serverErrors);
      setStatus("error");
      setFeedback(
        formMessages.length > 0
          ? formMessages.join(" ")
          : "We could not send your message. Please try again shortly.",
      );
      return false;
    } catch (error) {
      setStatus("error");
      setFeedback(
        error instanceof Error && error.name === "TypeError"
          ? "The submission could not be sent. Check your connection and try again."
          : "Something went wrong. Please try again shortly.",
      );
      return false;
    } finally {
      submittingRef.current = false;
    }
  }

  function reset() {
    setStatus("idle");
    setFeedback(null);
    setFieldErrors({});
  }

  return { status, feedback, fieldErrors, submit, reset };
}
