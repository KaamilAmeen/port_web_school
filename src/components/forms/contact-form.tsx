"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";
import { Honeypot, TextField, TextAreaField } from "@/components/forms/form-field";
import { Button } from "@/components/ui/button";
import { useFormspree } from "@/hooks/use-formspree";
import { contactCopy } from "@/content/pages";
import {
  contactSchema,
  formspreeEndpoint,
  type ContactValues,
} from "@/lib/formspree";

const initialValues: ContactValues = {
  _gotcha: "",
  fullName: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

export function ContactForm() {
  const [values, setValues] = useState<ContactValues>(initialValues);
  const { status, feedback, fieldErrors, submit, reset } = useFormspree({
    schema: contactSchema,
    endpoint: formspreeEndpoint(process.env.NEXT_PUBLIC_FORMSPREE_CONTACT_ID),
    successMessage: "Thank you — your message was received by Formspree.",
    toPayload: ({ fullName, email, phone, subject, message, _gotcha }) => ({
      fullName,
      email,
      phone,
      subject,
      message,
      _gotcha: _gotcha ?? "",
    }),
  });

  const update = (field: keyof ContactValues, value: string) =>
    setValues((current) => ({ ...current, [field]: value }));

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const succeeded = await submit(values);
    if (succeeded) setValues(initialValues);
  };

  if (status === "success") {
    return (
      <div role="status" className="border border-gold/50 bg-white p-8">
        <CheckCircle2 aria-hidden="true" className="size-8 text-navy" />
        <h3 className="mt-4 font-display text-2xl text-navy">Message received</h3>
        <p className="mt-3 text-sm text-charcoal/75">{feedback}</p>
        <Button
          variant="secondary"
          className="mt-6"
          onClick={() => {
            reset();
            setValues(initialValues);
          }}
        >
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate aria-busy={status === "submitting"} className="grid gap-6">
      <Honeypot
        value={values._gotcha ?? ""}
        onChange={(value) => update("_gotcha", value)}
      />
      <div className="grid gap-6 sm:grid-cols-2">
        <TextField
          id="contact-full-name"
          name="fullName"
          label="Full name"
          autoComplete="name"
          required
          value={values.fullName}
          error={fieldErrors.fullName}
          onChange={(event) => update("fullName", event.target.value)}
        />
        <TextField
          id="contact-email"
          name="email"
          type="email"
          label="Email"
          autoComplete="email"
          required
          value={values.email}
          error={fieldErrors.email}
          onChange={(event) => update("email", event.target.value)}
        />
        <TextField
          id="contact-phone"
          name="phone"
          type="tel"
          label="Phone number"
          autoComplete="tel"
          required
          value={values.phone}
          error={fieldErrors.phone}
          onChange={(event) => update("phone", event.target.value)}
        />
        <TextField
          id="contact-subject"
          name="subject"
          label="Subject"
          required
          value={values.subject}
          error={fieldErrors.subject}
          onChange={(event) => update("subject", event.target.value)}
        />
      </div>
      <TextAreaField
        id="contact-message"
        name="message"
        label="Message"
        required
        value={values.message}
        error={fieldErrors.message}
        onChange={(event) => update("message", event.target.value)}
      />
      {feedback ? (
        <p role="alert" className="text-sm text-red-800">
          {feedback}
        </p>
      ) : null}
      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" disabled={status === "submitting"}>
          {status === "submitting" ? "Sending…" : "Send message"}
        </Button>
        <p className="text-xs text-charcoal/60">
          Choose a topic: {contactCopy.topics.join(", ")}.
        </p>
      </div>
    </form>
  );
}
