/**
 * Curated photography used across the website.
 *
 * These are Pexels photographs stored locally as WebP files. The original SVG
 * illustrations remain in `public/images/demo/` as fallbacks.
 */

export type DemoImage = {
  src: string;
  alt: string;
  credit: string;
};

const demoImage = (
  name: string,
  alt: string,
  photographer: string,
): DemoImage => ({
  src: `/images/curated/${name}.webp`,
  alt,
  credit: `Photograph by ${photographer} via Pexels`,
});

export const demoImages = {
  hero: demoImage(
    "school-campus-students",
    "Students and a teacher walking through a school courtyard",
    "Thirdman",
  ),
  introduction: demoImage(
    "students-walking-campus",
    "Students walking together along a campus path",
    "George Pak",
  ),
  academics: demoImage(
    "science-lab-experiment",
    "Students conducting an experiment in a science laboratory",
    "MART PRODUCTION",
  ),
  library: demoImage(
    "school-library-reading",
    "Student reading among books in a school library",
    "Thirdman",
  ),
  classroom: demoImage(
    "bright-classroom-lesson",
    "Students taking part in a lesson in a bright classroom",
    "Yan Krukau",
  ),
  collaboration: demoImage(
    "students-computer-lab-collaboration",
    "Students collaborating at computers in a technology lab",
    "Gustavo Fring",
  ),
  sports: demoImage(
    "students-outdoor-sports",
    "Students playing sport together outdoors",
    "Joaquin Reyes Ramos",
  ),
  campus: demoImage(
    "school-building-playground",
    "School building beside an outdoor playground",
    "Mary Taylor",
  ),
  arts: demoImage(
    "students-art-class",
    "Students painting and sharing work in an art class",
    "Pavel Danilyuk",
  ),
  community: demoImage(
    "school-award-ceremony",
    "Students gathered at a school award ceremony",
    "Legacy of Fire",
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
