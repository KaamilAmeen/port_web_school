/**
 * Local SVG placeholders used until verified, school-approved imagery is supplied.
 * These are illustrative graphics, not photographs or representations of real people,
 * events, facilities or achievements.
 */

export type PlaceholderImage = {
  src: string;
  alt: string;
  credit: string;
};

const placeholder = (name: string, alt: string): PlaceholderImage => ({
  src: `/images/placeholders/${name}.svg`,
  alt,
  credit: "Local placeholder graphic",
});

export const placeholderImages = {
  hero: placeholder(
    "hero",
    "Placeholder illustration representing a school building",
  ),
  introduction: placeholder(
    "introduction",
    "Placeholder illustration representing student learning",
  ),
  academics: placeholder(
    "academics",
    "Placeholder illustration representing academic discovery",
  ),
  library: placeholder("library", "Placeholder illustration representing a library"),
  classroom: placeholder(
    "classroom",
    "Placeholder illustration representing a classroom",
  ),
  collaboration: placeholder(
    "collaboration",
    "Placeholder illustration representing student collaboration",
  ),
  sports: placeholder("sports", "Placeholder illustration representing school sport"),
  campus: placeholder(
    "campus",
    "Placeholder illustration representing a campus walkway",
  ),
  arts: placeholder("arts", "Placeholder illustration representing creative arts"),
  community: placeholder(
    "community",
    "Placeholder illustration representing school community",
  ),
} satisfies Record<string, PlaceholderImage>;

export const galleryPlaceholders: readonly PlaceholderImage[] = [
  placeholderImages.hero,
  placeholderImages.classroom,
  placeholderImages.library,
  placeholderImages.academics,
  placeholderImages.collaboration,
  placeholderImages.sports,
  placeholderImages.arts,
  placeholderImages.campus,
  placeholderImages.introduction,
  placeholderImages.community,
];
