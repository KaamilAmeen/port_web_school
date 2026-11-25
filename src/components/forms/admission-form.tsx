"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";
import {
  Honeypot,
  SelectField,
  TextField,
  TextAreaField,
} from "@/components/forms/form-field";
import { Button } from "@/components/ui/button";
import { admissionsCopy } from "@/content/pages";
import { useFormspree } from "@/hooks/use-formspree";
import {
  admissionSchema,
  formspreeEndpoint,
  type AdmissionValues,
} from "@/lib/formspree";

const initialValues: AdmissionValues = {
  _gotcha: "",
  parentName: "",
  email: "",
  phone: "",
  studentName: "",
  grade: "",
  academicYear: "",
  message: "",
};

export function AdmissionForm() {
  const [values, setValues] = useState<AdmissionValues>(initialValues);
  const { status, feedback, fieldErrors, submit, reset } = useFormspree({
    schema: admissionSchema,
    endpoint: formspreeEndpoint(
      process.env.NEXT_PUBLIC_FORMSPREE_ADMISSION_ID,
    ),
    successMessage: "Thank you — your admission enquiry was received by Formspree.",
    toPayload: ({
      parentName,
      email,
      phone,
      studentName,
      grade,
      academicYear,
      message,
      _gotcha,
    }) => ({
      parentName,
      email,
      phone,
      studentName,
      grade,
      academicYear,
      message,
      _gotcha: _gotcha ?? "",
    }),
  });

  const update = (field: keyof AdmissionValues, value: string) =>
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
        <h3 className="mt-4 font-display text-2xl text-navy">Enquiry received</h3>
        <p className="mt-3 text-sm text-charcoal/75">{feedback}</p>
        <Button
          variant="secondary"
          className="mt-6"
          onClick={() => {
            reset();
            setValues(initialValues);
          }}
        >
          Make another enquiry
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
          id="admission-parent-name"
          name="parentName"
          label="Parent/guardian name"
          autoComplete="name"
          required
          value={values.parentName}
          error={fieldErrors.parentName}
          onChange={(event) => update("parentName", event.target.value)}
        />
        <TextField
          id="admission-email"
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
          id="admission-phone"
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
          id="admission-student-name"
          name="studentName"
          label="Student name"
          hint="Optional — include only if you are comfortable sharing it."
          value={values.studentName}
          error={fieldErrors.studentName}
          onChange={(event) => update("studentName", event.target.value)}
        />
        <SelectField
          id="admission-grade"
          name="grade"
          label="Interested grade/class"
          required
          value={values.grade}
          error={fieldErrors.grade}
          onChange={(event) => update("grade", event.target.value)}
        >
          <option value="">Select a grade</option>
          {admissionsCopy.gradeOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </SelectField>
        <SelectField
          id="admission-year"
          name="academicYear"
          label="Academic year"
          required
          value={values.academicYear}
          error={fieldErrors.academicYear}
          onChange={(event) => update("academicYear", event.target.value)}
        >
          <option value="">Select a year</option>
          {admissionsCopy.yearOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </SelectField>
      </div>
      <TextAreaField
        id="admission-message"
        name="message"
        label="Additional message"
        hint="Optional. Please do not include sensitive documents in this form."
        value={values.message}
        error={fieldErrors.message}
        onChange={(event) => update("message", event.target.value)}
      />
      {feedback ? (
        <p role="alert" className="text-sm text-red-800">
          {feedback}
        </p>
      ) : null}
      <div>
        <Button type="submit" disabled={status === "submitting"}>
          {status === "submitting" ? "Sending…" : "Submit enquiry"}
        </Button>
      </div>
    </form>
  );
}
