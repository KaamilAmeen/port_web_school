import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AdmissionForm } from "@/components/forms/admission-form";
import { ContactForm } from "@/components/forms/contact-form";

type ServerError = { field?: string; message: string };

function mockFormspreeResponse(options: {
  success: boolean;
  errors?: ServerError[];
  error?: string;
}) {
  const payload = options.success
    ? { next: "/thanks" }
    : options.error
      ? { error: options.error }
      : { errors: options.errors ?? [] };

  const fetchMock = vi.fn().mockResolvedValue({
    json: async () => payload,
  });
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
}

async function fillContactForm(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByRole("textbox", { name: /full name/i }), "Test Parent");
  await user.type(screen.getByRole("textbox", { name: /^email/i }), "parent@example.test");
  await user.type(screen.getByRole("textbox", { name: /phone number/i }), "+1 555 010 1234");
  await user.type(screen.getByRole("textbox", { name: /subject/i }), "Admission question");
  await user.type(
    screen.getByRole("textbox", { name: /message/i }),
    "Please send the confirmed admission dates for next year.",
  );
}

describe("ContactForm", () => {
  beforeEach(() => {
    vi.stubEnv("NEXT_PUBLIC_FORMSPREE_CONTACT_ID", "test-contact-form");
  });

  it("blocks an invalid submission and shows inline validation errors", async () => {
    const fetchMock = mockFormspreeResponse({ success: true });
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.click(screen.getByRole("button", { name: "Send message" }));

    expect(await screen.findByText("Full name is required.")).toBeInTheDocument();
    expect(screen.getByText("Email is required.")).toBeInTheDocument();
    expect(screen.getByText("Phone number is required.")).toBeInTheDocument();
    expect(screen.getByText("Subject is required.")).toBeInTheDocument();
    expect(
      screen.getByText("Please write at least 10 characters."),
    ).toBeInTheDocument();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("submits a valid enquiry through @formspree/react", async () => {
    const fetchMock = mockFormspreeResponse({ success: true });
    const user = userEvent.setup();
    render(<ContactForm />);
    await fillContactForm(user);
    await user.click(screen.getByRole("button", { name: "Send message" }));

    expect(await screen.findByRole("status")).toHaveTextContent("Message received");
    expect(fetchMock).toHaveBeenCalledWith(
      "https://formspree.io/f/test-contact-form",
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({
          Accept: "application/json",
          "Content-Type": "application/json",
        }),
      }),
    );
  });

  it("does not claim success when the provider rejects the submission", async () => {
    const fetchMock = mockFormspreeResponse({
      success: false,
      errors: [{ message: "The form is currently unavailable." }],
    });
    const user = userEvent.setup();
    render(<ContactForm />);
    await fillContactForm(user);
    await user.click(screen.getByRole("button", { name: "Send message" }));

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "The form is currently unavailable.",
    );
    expect(screen.queryByText("Message received")).not.toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("maps provider field errors onto the matching input", async () => {
    mockFormspreeResponse({
      success: false,
      errors: [
        { field: "email", message: "Formspree rejected this email address." },
      ],
    });
    const user = userEvent.setup();
    render(<ContactForm />);
    await fillContactForm(user);
    await user.click(screen.getByRole("button", { name: "Send message" }));

    expect(
      await screen.findByText("Formspree rejected this email address."),
    ).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /^email/i })).toHaveAttribute(
      "aria-invalid",
      "true",
    );
  });

  it("does not post when the form ID is still a placeholder", async () => {
    vi.stubEnv("NEXT_PUBLIC_FORMSPREE_CONTACT_ID", "YOUR_FORMSPREE_CONTACT_FORM_ID");
    const fetchMock = mockFormspreeResponse({ success: true });
    const user = userEvent.setup();
    render(<ContactForm />);
    await fillContactForm(user);
    await user.click(screen.getByRole("button", { name: "Send message" }));

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "This form is temporarily unavailable",
    );
    expect(fetchMock).not.toHaveBeenCalled();
  });
});

describe("AdmissionForm", () => {
  beforeEach(() => {
    vi.stubEnv("NEXT_PUBLIC_FORMSPREE_ADMISSION_ID", "test-admission-form");
  });

  it("blocks an invalid enquiry with accessible field errors", async () => {
    const fetchMock = mockFormspreeResponse({ success: true });
    const user = userEvent.setup();
    render(<AdmissionForm />);

    await user.click(screen.getByRole("button", { name: "Submit enquiry" }));

    expect(
      await screen.findByText("Parent/guardian name is required."),
    ).toBeInTheDocument();
    expect(screen.getByText("Select an interested grade/class.")).toBeInTheDocument();
    expect(screen.getByText("Select an academic year.")).toBeInTheDocument();
    expect(fetchMock).not.toHaveBeenCalled();

    const nameInput = screen.getByRole("textbox", { name: /parent\/guardian name/i });
    expect(nameInput).toHaveAttribute("aria-invalid", "true");
    expect(nameInput).toHaveAccessibleDescription("Parent/guardian name is required.");
  });

  it("submits a valid enquiry through @formspree/react", async () => {
    const fetchMock = mockFormspreeResponse({ success: true });
    const user = userEvent.setup();
    render(<AdmissionForm />);

    await user.type(
      screen.getByRole("textbox", { name: /parent\/guardian name/i }),
      "Test Parent",
    );
    await user.type(screen.getByRole("textbox", { name: /^email/i }), "parent@example.test");
    await user.type(screen.getByRole("textbox", { name: /phone number/i }), "+1 555 010 1234");
    await user.selectOptions(
      screen.getByRole("combobox", { name: /interested grade/i }),
      "Grade 3",
    );
    await user.selectOptions(
      screen.getByRole("combobox", { name: /academic year/i }),
      "2026–2027",
    );
    await user.click(screen.getByRole("button", { name: "Submit enquiry" }));

    expect(await screen.findByRole("status")).toHaveTextContent("Enquiry received");
    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith(
        "https://formspree.io/f/test-admission-form",
        expect.objectContaining({ method: "POST" }),
      );
    });
  });
});
