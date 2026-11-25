import { describe, expect, it } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { GalleryGrid } from "@/components/gallery/gallery-grid";
import type { SanityGalleryItem } from "@/lib/types/sanity";

const items: SanityGalleryItem[] = [
  {
    _id: "gallery-1",
    title: "First approved image",
    slug: "first-approved-image",
    imageUrl: null,
    category: "Campus",
  },
  {
    _id: "gallery-2",
    title: "Second approved image",
    slug: "second-approved-image",
    imageUrl: null,
    category: "Campus",
  },
];

describe("GalleryGrid", () => {
  it("opens a lightbox, navigates with the keyboard and closes with Escape", async () => {
    const user = userEvent.setup();
    render(<GalleryGrid items={items} />);

    await user.click(
      screen.getByRole("button", { name: "Open image: First approved image" }),
    );

    expect(
      screen.getByRole("dialog", { name: "Gallery image: First approved image" }),
    ).toBeInTheDocument();
    expect(screen.getByText(/1 of 2/)).toBeInTheDocument();

    await user.keyboard("{ArrowRight}");

    await waitFor(() => {
      expect(
        screen.getByRole("dialog", { name: "Gallery image: Second approved image" }),
      ).toBeInTheDocument();
    });
    expect(screen.getByText(/2 of 2/)).toBeInTheDocument();

    await user.keyboard("{Escape}");

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });

  it("filters images by category with an accessible pressed state", async () => {
    const user = userEvent.setup();
    render(
      <GalleryGrid
        items={[
          ...items,
          {
            _id: "gallery-3",
            title: "Athletics image",
            slug: "athletics-image",
            imageUrl: null,
            category: "Sports",
          },
        ]}
      />,
    );

    const sportsFilter = screen.getByRole("button", { name: "Sports" });
    expect(sportsFilter).toHaveAttribute("aria-pressed", "false");

    await user.click(sportsFilter);

    expect(sportsFilter).toHaveAttribute("aria-pressed", "true");
    expect(
      screen.queryByRole("button", { name: "Open image: First approved image" }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Open image: Athletics image" }),
    ).toBeInTheDocument();
  });
});
