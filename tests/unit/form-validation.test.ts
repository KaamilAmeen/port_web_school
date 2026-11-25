import { describe, expect, it } from "vitest";
import {
  admissionSchema,
  contactSchema,
  formspreeEndpoint,
  formspreeFormId,
} from "@/lib/formspree";

const validContact = {
  fullName: "Test Parent",
  email: "parent@example.test",
  phone: "+1 555 010 1234",
  subject: "Admission question",
  message: "Please send the confirmed admission dates for next year.",
};

const validAdmission = {
  parentName: "Test Parent",
  email: "parent@example.test",
  phone: "+1 555 010 1234",
  studentName: "",
  grade: "Grade 3",
  academicYear: "2026–2027",
  message: "",
};

describe("form validation", () => {
  it("accepts a valid contact submission", () => {
    expect(contactSchema.safeParse(validContact).success).toBe(true);
  });

  it("rejects invalid contact fields with field-level messages", () => {
    const result = contactSchema.safeParse({
      ...validContact,
      email: "not-an-email",
      phone: "abc",
      message: "short",
    });

    expect(result.success).toBe(false);
    if (result.success) return;

    const messages = result.error.issues.map((issue) => issue.message);
    expect(messages).toContain("Enter a valid email address.");
    expect(messages).toContain("Enter a valid phone number.");
    expect(messages).toContain("Please write at least 10 characters.");
  });

  it("requires contact fields", () => {
    const result = contactSchema.safeParse({
      fullName: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });

    expect(result.success).toBe(false);
    if (result.success) return;

    const paths = result.error.issues.map((issue) => issue.path[0]);
    expect(paths).toEqual(
      expect.arrayContaining(["fullName", "email", "phone", "subject", "message"]),
    );
  });

  it("accepts a valid admission enquiry with an optional student name omitted", () => {
    expect(admissionSchema.safeParse(validAdmission).success).toBe(true);
  });

  it("rejects an admission enquiry with missing required selections", () => {
    const result = admissionSchema.safeParse({
      ...validAdmission,
      parentName: "A",
      grade: "",
      academicYear: "",
    });

    expect(result.success).toBe(false);
    if (result.success) return;

    const messages = result.error.issues.map((issue) => issue.message);
    expect(messages).toContain("Parent/guardian name is required.");
    expect(messages).toContain("Select an interested grade/class.");
    expect(messages).toContain("Select an academic year.");
  });

  it("builds a Formspree endpoint from an id and preserves a full URL", () => {
    expect(formspreeEndpoint("test-contact-form")).toBe(
      "https://formspree.io/f/test-contact-form",
    );
    expect(formspreeEndpoint("https://formspree.io/f/test-form")).toBe(
      "https://formspree.io/f/test-form",
    );
    expect(formspreeEndpoint("  ")).toBeNull();
    expect(formspreeEndpoint(undefined)).toBeNull();
    expect(formspreeEndpoint("YOUR_FORMSPREE_CONTACT_FORM_ID")).toBeNull();
    expect(formspreeEndpoint("REPLACE_WITH_FORM_ID")).toBeNull();
  });

  it("extracts the Formspree hashid used by @formspree/react", () => {
    expect(formspreeFormId(" test-contact-form ")).toBe("test-contact-form");
    expect(formspreeFormId("https://formspree.io/f/test-form")).toBe("test-form");
    expect(formspreeFormId("YOUR_FORMSPREE_CONTACT_FORM_ID")).toBeNull();
    expect(formspreeFormId(undefined)).toBeNull();
  });
});
