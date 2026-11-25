import { z } from "zod";
import { isPlaceholderEnvValue } from "@/lib/env";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^\+?[\d\s().-]{7,24}$/;

const emailField = z
  .string()
  .trim()
  .min(1, "Email is required.")
  .regex(emailPattern, "Enter a valid email address.");

const phoneField = z
  .string()
  .trim()
  .min(1, "Phone number is required.")
  .regex(phonePattern, "Enter a valid phone number.")
  .refine(
    (value) => value.replace(/\D/g, "").length >= 7,
    "Phone number must contain at least 7 digits.",
  );

const honeypotField = z.string().max(200).optional();

export const contactSchema = z.object({
  _gotcha: honeypotField,
  fullName: z.string().trim().min(2, "Full name is required.").max(100),
  email: emailField,
  phone: phoneField,
  subject: z.string().trim().min(2, "Subject is required.").max(140),
  message: z.string().trim().min(10, "Please write at least 10 characters.").max(2000),
});

export const admissionSchema = z.object({
  _gotcha: honeypotField,
  parentName: z.string().trim().min(2, "Parent/guardian name is required.").max(100),
  email: emailField,
  phone: phoneField,
  studentName: z.string().trim().max(100),
  grade: z.string().trim().min(1, "Select an interested grade/class."),
  academicYear: z.string().trim().min(1, "Select an academic year."),
  message: z.string().trim().max(2000),
});

export type ContactValues = z.infer<typeof contactSchema>;
export type AdmissionValues = z.infer<typeof admissionSchema>;

/** Accepts either a Formspree form ID or a full endpoint URL. */
export function formspreeEndpoint(id: string | undefined): string | null {
  const value = id?.trim();
  if (!value || isPlaceholderEnvValue(value)) return null;
  if (/^https?:\/\//i.test(value)) return value;
  return `https://formspree.io/f/${encodeURIComponent(value)}`;
}
