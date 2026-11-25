/**
 * Locally generated SVG illustrations used by the fictional demo dataset.
 * They are stylised artwork, not photographs, and must be replaced with
 * approved school imagery before the site represents a real institution.
 */

export type DemoImage = {
  src: string;
  alt: string;
  credit: string;
};

const demoImage = (name: string, alt: string): DemoImage => ({
  src: `/images/demo/${name}.svg`,
  alt,
  credit: "Fictional demo illustration",
});

export const demoImages = {
  hero: demoImage(
    "hero",
    "Fictional illustration of a school building at golden hour",
  ),
  introduction: demoImage(
    "introduction",
    "Fictional illustration of students on a campus walkway",
  ),
  academics: demoImage(
    "academics",
    "Fictional illustration of a science laboratory",
  ),
  library: demoImage("library", "Fictional illustration of a school library"),
  classroom: demoImage("classroom", "Fictional illustration of a classroom"),
  collaboration: demoImage(
    "collaboration",
    "Fictional illustration of students collaborating",
  ),
  sports: demoImage("sports", "Fictional illustration of a school sports field"),
  campus: demoImage("campus", "Fictional illustration of a campus walkway"),
  arts: demoImage("arts", "Fictional illustration of an art studio"),
  community: demoImage(
    "community",
    "Fictional illustration of a school community gathering",
  ),
} satisfies Record<string, DemoImage>;

export const demoGalleryImages: readonly DemoImage[] = [
  demoImages.hero,
  demoImages.classroom,
  demoImages.library,
  demoImages.academics,
  demoImages.collaboration,
  demoImages.sports,
  demoImages.arts,
  demoImages.campus,
  demoImages.introduction,
  demoImages.community,
];
