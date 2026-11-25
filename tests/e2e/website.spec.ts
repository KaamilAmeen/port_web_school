import { expect, test, type Page } from "@playwright/test";

const testFormIds = {
  contact: "test-contact-form",
  admission: "test-admission-form",
};

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "content-type, accept",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

async function mockFormspree(page: Page, formId: string) {
  await page.route(`https://formspree.io/f/${formId}`, async (route) => {
    if (route.request().method() === "OPTIONS") {
      await route.fulfill({ status: 204, headers: corsHeaders });
      return;
    }
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      headers: corsHeaders,
      body: JSON.stringify({ ok: true }),
    });
  });
}

async function fillContactForm(page: Page) {
  await page.getByRole("textbox", { name: /full name/i }).fill("Test Parent");
  await page.getByRole("textbox", { name: /^email/i }).fill("parent@example.test");
  await page.getByRole("textbox", { name: /phone number/i }).fill("+1 555 010 1234");
  await page.getByRole("textbox", { name: /subject/i }).fill("Admission question");
  await page
    .getByRole("textbox", { name: /message/i })
    .fill("Please send the confirmed admission dates for next year.");
}

async function fillAdmissionForm(page: Page) {
  await page
    .getByRole("textbox", { name: /parent\/guardian name/i })
    .fill("Test Parent");
  await page.getByRole("textbox", { name: /^email/i }).fill("parent@example.test");
  await page.getByRole("textbox", { name: /phone number/i }).fill("+1 555 010 1234");
  await page
    .getByRole("combobox", { name: /interested grade/i })
    .selectOption({ label: "Grade 3" });
  await page
    .getByRole("combobox", { name: /academic year/i })
    .selectOption({ label: "2026–2027" });
}

test("homepage renders and desktop navigation works", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: /place to grow, question, and belong/i,
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("note").filter({ hasText: /fictional demo school/i }).first(),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Explore Admissions" }),
  ).toBeVisible();

  await page
    .getByRole("navigation", { name: "Primary" })
    .getByRole("link", { name: "About" })
    .click();

  await expect(page).toHaveURL(/\/about$/);
  await expect(
    page.getByRole("heading", { level: 1, name: /about aurelia academy/i }),
  ).toBeVisible();
});

test("mobile menu opens and navigates without horizontal overflow", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  const menuToggle = page.getByRole("button", { name: "Open navigation menu" });
  await expect(menuToggle).toBeVisible();
  await menuToggle.click();

  const mobileNav = page.getByRole("navigation", { name: "Mobile" });
  await expect(mobileNav).toBeVisible();
  await mobileNav.getByRole("link", { name: "Gallery" }).click();

  await expect(page).toHaveURL(/\/gallery$/);
  const scrollWidth = await page.evaluate(
    () => document.documentElement.scrollWidth,
  );
  expect(scrollWidth).toBeLessThanOrEqual(390);
});

test("all approved routes respond successfully", async ({ request }) => {
  // Sanity Studio is compiled on first request in development and can be slow.
  test.setTimeout(120_000);
  const routes = [
    "/",
    "/about",
    "/academics",
    "/achievements",
    "/campus-life",
    "/gallery",
    "/admissions",
    "/contact",
    "/blog",
    "/studio",
    "/sitemap.xml",
    "/robots.txt",
  ];

  for (const route of routes) {
    const response = await request.get(route);
    expect(response.ok(), `${route} should return 2xx`).toBe(true);
  }
});

test("blog listing renders demo articles when CMS content is unavailable", async ({
  page,
}) => {
  test.skip(
    Boolean(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID),
    "A configured CMS may contain published articles; this test covers the unconfigured demo state.",
  );

  await page.goto("/blog");
  await expect(
    page.getByRole("heading", { level: 1, name: "Blog" }),
  ).toBeVisible();
  await expect(page.getByRole("search")).toBeVisible();
  await expect(
    page.getByText("How inquiry shapes a Monday morning").first(),
  ).toBeVisible();
  await expect(
    page.getByRole("note").filter({ hasText: /fictional demo/i }).first(),
  ).toBeVisible();
});

test("unknown blog slugs use the not-found state", async ({ page }) => {
  await page.goto("/blog/e2e-slug-that-does-not-exist");
  await expect(
    page.getByRole("heading", { name: /could not find that page/i }),
  ).toBeVisible();
});

test("blog article detail renders a published or demo article", async ({
  page,
}) => {
  const configured = Boolean(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID);
  const slug =
    process.env.E2E_TEST_BLOG_SLUG ?? "how-inquiry-shapes-a-monday-morning";
  test.skip(
    configured && !process.env.E2E_TEST_BLOG_SLUG,
    "Set E2E_TEST_BLOG_SLUG to test an article from the configured CMS.",
  );

  await page.goto(`/blog/${slug}`);
  await expect(page.locator("article h1")).toBeVisible();
  if (!configured) {
    await expect(
      page.getByRole("note").filter({ hasText: /fictional demo/i }).first(),
    ).toBeVisible();
  }
});

test("gallery lightbox supports keyboard navigation", async ({ page }) => {
  const configured = Boolean(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID);
  const firstTitle = process.env.E2E_GALLERY_FIRST_TITLE ?? "The academy building";
  test.skip(
    configured && !process.env.E2E_GALLERY_FIRST_TITLE,
    "Set E2E_GALLERY_FIRST_TITLE to test an image from the configured CMS.",
  );

  await page.goto("/gallery");
  await page
    .getByRole("button", { name: `Open image: ${firstTitle}` })
    .click();
  await expect(
    page.getByRole("dialog", { name: `Gallery image: ${firstTitle}` }),
  ).toBeVisible();

  await page.keyboard.press("ArrowRight");
  await expect(page.locator('[aria-live="polite"]')).toContainText("2 of");

  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
});

test("invalid contact submission is blocked with accessible errors", async ({
  page,
}) => {
  await page.goto("/contact");
  await page.getByRole("button", { name: "Send message" }).click();

  await expect(page.getByText("Full name is required.")).toBeVisible();
  await expect(page.getByText("Email is required.")).toBeVisible();
  await expect(page.getByText("Phone number is required.")).toBeVisible();
});

test("valid contact submission shows success with a mocked Formspree response", async ({
  page,
}) => {
  await mockFormspree(page, testFormIds.contact);
  await page.goto("/contact");
  await fillContactForm(page);
  await page.getByRole("button", { name: "Send message" }).click();

  await expect(
    page.getByRole("heading", { name: "Message received" }),
  ).toBeVisible();
});

test("invalid admission enquiry is blocked with accessible errors", async ({
  page,
}) => {
  await page.goto("/admissions#enquiry");
  await page.getByRole("button", { name: "Submit enquiry" }).click();

  await expect(
    page.getByText("Parent/guardian name is required."),
  ).toBeVisible();
  await expect(
    page.getByText("Select an interested grade/class."),
  ).toBeVisible();
  await expect(page.getByText("Select an academic year.")).toBeVisible();
});

test("valid admission enquiry shows success with a mocked Formspree response", async ({
  page,
}) => {
  await mockFormspree(page, testFormIds.admission);
  await page.goto("/admissions#enquiry");
  await fillAdmissionForm(page);
  await page.getByRole("button", { name: "Submit enquiry" }).click();

  await expect(
    page.getByRole("heading", { name: "Enquiry received" }),
  ).toBeVisible();
});

test("unmatched routes render the custom not-found page", async ({ page }) => {
  await page.goto("/this-page-does-not-exist");
  await expect(
    page.getByRole("heading", { name: /could not find that page/i }),
  ).toBeVisible();
});
