/**
 * Fictional demo records used when Sanity has no published content.
 *
 * These records deliberately use `demo-` prefixed IDs so the UI can label
 * them as demonstration data. Published Sanity documents always take priority.
 */

import { demoImages } from "@/content/images";
import type {
  SanityAchievement,
  SanityBlogCard,
  SanityBlogPost,
  SanityCategory,
  SanityGalleryItem,
} from "@/lib/types/sanity";

export function isDemoId(id: string): boolean {
  return id.startsWith("demo-");
}

function textBlock(
  text: string,
  key: string,
  style: "normal" | "h2" | "h3" | "blockquote" = "normal",
) {
  return {
    _type: "block",
    _key: key,
    style,
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: `${key}-span`,
        text,
        marks: [],
      },
    ],
  };
}

export const demoCategories: SanityCategory[] = [
  {
    _id: "demo-category-learning",
    title: "Learning",
    slug: "learning",
    description: "Fictional stories about teaching and study.",
  },
  {
    _id: "demo-category-campus",
    title: "Campus",
    slug: "campus",
    description: "Fictional stories about life on campus.",
  },
  {
    _id: "demo-category-community",
    title: "Community",
    slug: "community",
    description: "Fictional stories about people and partnerships.",
  },
  {
    _id: "demo-category-achievements",
    title: "Achievements",
    slug: "achievements",
    description: "Fictional highlights shared for demonstration.",
  },
];

export const demoBlogPosts: SanityBlogPost[] = [
  {
    _id: "demo-blog-inquiry",
    title: "How inquiry shapes a Monday morning",
    slug: "how-inquiry-shapes-a-monday-morning",
    excerpt:
      "A fictional look at how questions, discussion and practical work can set the tone for a week of learning.",
    coverImageUrl: demoImages.classroom.src,
    coverImageAlt: demoImages.classroom.alt,
    categoryTitle: "Learning",
    categorySlug: "learning",
    categoryRef: "demo-category-learning",
    authorName: "Dr. Elaine Hartwell",
    authorDesignation: "Head of School (fictional)",
    authorBiography: "A fictional school leader created for this demonstration.",
    authorProfileImageUrl: null,
    publishedAt: "2026-10-18",
    featured: true,
    body: [
      textBlock(
        "The first lesson of the week is rarely the loudest. At Aurelia Academy, a fictional school built for this demo, Monday mornings often begin with a question on the board and a short conversation about what students already notice.",
        "inquiry-1",
      ),
      textBlock("Questions before answers", "inquiry-2", "h2"),
      textBlock(
        "Teachers use open prompts to invite hypotheses. Students compare ideas, test them against what they know and decide what evidence would help them move forward.",
        "inquiry-3",
      ),
      textBlock(
        "The approach is illustrative, but the pattern is familiar: curiosity becomes a routine rather than a special event.",
        "inquiry-4",
      ),
    ],
  },
  {
    _id: "demo-blog-library",
    title: "Inside the library: a space for thinking",
    slug: "inside-the-library-a-space-for-thinking",
    excerpt:
      "A fictional tour of the reading corners, group tables and quiet spots that make a library feel alive.",
    coverImageUrl: demoImages.library.src,
    coverImageAlt: demoImages.library.alt,
    categoryTitle: "Learning",
    categorySlug: "learning",
    categoryRef: "demo-category-learning",
    authorName: "Ms. Priya Raman",
    authorDesignation: "Head of Academics (fictional)",
    authorBiography: "A fictional academic leader created for this demonstration.",
    authorProfileImageUrl: null,
    publishedAt: "2026-10-05",
    featured: true,
    body: [
      textBlock(
        "A good library offers more than shelves. It gives students permission to linger, to follow a footnote and to change their minds about what interests them.",
        "library-1",
      ),
      textBlock("Designed for different kinds of focus", "library-2", "h2"),
      textBlock(
        "In this fictional illustration, quiet window seats sit alongside group tables and a making area. The point is to show how a school might describe reading, research and collaboration in one place.",
        "library-3",
      ),
      textBlock(
        "Replace this story with a real library profile before the site goes live.",
        "library-4",
      ),
    ],
  },
  {
    _id: "demo-blog-belonging",
    title: "The house system and the art of belonging",
    slug: "the-house-system-and-the-art-of-belonging",
    excerpt:
      "How a fictional house system could help students find friends, mentors and a sense of place.",
    coverImageUrl: demoImages.community.src,
    coverImageAlt: demoImages.community.alt,
    categoryTitle: "Community",
    categorySlug: "community",
    categoryRef: "demo-category-community",
    authorName: "Ms. Sofia Marin",
    authorDesignation: "Head of Pastoral Care (fictional)",
    authorBiography: "A fictional pastoral leader created for this demonstration.",
    authorProfileImageUrl: null,
    publishedAt: "2026-09-22",
    featured: true,
    body: [
      textBlock(
        "Belonging is built in small ways: a familiar face at the door, a mentor who remembers a question, a team that saves a seat at lunch.",
        "belonging-1",
      ),
      textBlock("A structure for connection", "belonging-2", "h2"),
      textBlock(
        "This demo describes a house system as a way for students across year groups to meet, share responsibilities and celebrate one another.",
        "belonging-3",
      ),
      textBlock(
        "No real house names or results are implied; the story exists to show the tone of a pastoral update.",
        "belonging-4",
      ),
    ],
  },
  {
    _id: "demo-blog-science",
    title: "A term of science experiments",
    slug: "a-term-of-science-experiments",
    excerpt:
      "Fictional notes from a laboratory where small experiments lead to bigger questions.",
    coverImageUrl: demoImages.academics.src,
    coverImageAlt: demoImages.academics.alt,
    categoryTitle: "Learning",
    categorySlug: "learning",
    categoryRef: "demo-category-learning",
    authorName: "Ms. Priya Raman",
    authorDesignation: "Head of Academics (fictional)",
    publishedAt: "2026-09-10",
    body: [
      textBlock(
        "The best experiments often begin with something simple: a prediction, a careful measurement and a result that does not quite fit.",
        "science-1",
      ),
      textBlock("Learning from the unexpected", "science-2", "h2"),
      textBlock(
        "Students in this fictional account keep notebooks of predictions and reflections, then compare their findings with classmates.",
        "science-3",
      ),
    ],
  },
  {
    _id: "demo-blog-sport",
    title: "On the sports field: lessons beyond winning",
    slug: "on-the-sports-field-lessons-beyond-winning",
    excerpt:
      "A fictional reflection on teamwork, practice and the value of showing up for one another.",
    coverImageUrl: demoImages.sports.src,
    coverImageAlt: demoImages.sports.alt,
    categoryTitle: "Campus",
    categorySlug: "campus",
    categoryRef: "demo-category-campus",
    authorName: "Mr. Daniel Okafor",
    authorDesignation: "Deputy Head (fictional)",
    publishedAt: "2026-08-28",
    body: [
      textBlock(
        "Sport offers a visible lesson in practice. Progress is usually gradual, built through repeated small efforts that few people see.",
        "sport-1",
      ),
      textBlock("What the scoreboard misses", "sport-2", "h2"),
      textBlock(
        "This fictional story focuses on collaboration and resilience rather than results, illustrating how a school could write about sport without inventing claims.",
        "sport-3",
      ),
    ],
  },
  {
    _id: "demo-blog-studio",
    title: "Studio notes: students explain their work",
    slug: "studio-notes-students-explain-their-work",
    excerpt:
      "A fictional collection of thoughts from an art studio where process matters as much as the finished piece.",
    coverImageUrl: demoImages.arts.src,
    coverImageAlt: demoImages.arts.alt,
    categoryTitle: "Campus",
    categorySlug: "campus",
    categoryRef: "demo-category-campus",
    authorName: "Ms. Sofia Marin",
    authorDesignation: "Head of Pastoral Care (fictional)",
    publishedAt: "2026-08-14",
    body: [
      textBlock(
        "In the studio, students learn to talk about choices: why a colour was layered, why a shape was moved, why a first idea was abandoned.",
        "studio-1",
      ),
      textBlock("Process as a story", "studio-2", "h2"),
      textBlock(
        "The fictional comments below show how an arts article could give students a voice while keeping the focus on learning.",
        "studio-3",
      ),
      textBlock(
        "I changed the background three times before the figure felt right.",
        "studio-4",
        "blockquote",
      ),
    ],
  },
  {
    _id: "demo-blog-campus-walk",
    title: "A walk through the campus at golden hour",
    slug: "a-walk-through-the-campus-at-golden-hour",
    excerpt:
      "A fictional photo essay route through libraries, courtyards and playing fields.",
    coverImageUrl: demoImages.campus.src,
    coverImageAlt: demoImages.campus.alt,
    categoryTitle: "Campus",
    categorySlug: "campus",
    categoryRef: "demo-category-campus",
    authorName: "Dr. Elaine Hartwell",
    authorDesignation: "Head of School (fictional)",
    publishedAt: "2026-07-30",
    body: [
      textBlock(
        "The campus illustration in this demo is a place to imagine how a photo essay might read: architecture first, then the spaces between buildings.",
        "campus-1",
      ),
      textBlock("From threshold to courtyard", "campus-2", "h2"),
      textBlock(
        "A route could begin at the entrance, pass the library and finish on the field as the light changes. Real school photography should replace every illustration before publication.",
        "campus-3",
      ),
    ],
  },
  {
    _id: "demo-blog-garden",
    title: "Community garden project grows connections",
    slug: "community-garden-project-grows-connections",
    excerpt:
      "A fictional example of how a shared project can link science, service and families.",
    coverImageUrl: demoImages.introduction.src,
    coverImageAlt: demoImages.introduction.alt,
    categoryTitle: "Community",
    categorySlug: "community",
    categoryRef: "demo-category-community",
    authorName: "Mr. Daniel Okafor",
    authorDesignation: "Deputy Head (fictional)",
    publishedAt: "2026-07-16",
    body: [
      textBlock(
        "A garden is a useful metaphor for community: it needs patience, shared responsibility and attention to seasons.",
        "garden-1",
      ),
      textBlock("A project with many roles", "garden-2", "h2"),
      textBlock(
        "This fictional project brings together biology lessons, family volunteers and a simple service routine. It is included to demonstrate community storytelling, not to claim a real initiative.",
        "garden-3",
      ),
    ],
  },
  {
    _id: "demo-blog-admissions",
    title: "What our demo admissions process shows",
    slug: "what-our-demo-admissions-process-shows",
    excerpt:
      "A short explanation of the fictional enquiry journey shown throughout this template.",
    coverImageUrl: demoImages.hero.src,
    coverImageAlt: demoImages.hero.alt,
    categoryTitle: "Learning",
    categorySlug: "learning",
    categoryRef: "demo-category-learning",
    authorName: "Dr. Elaine Hartwell",
    authorDesignation: "Head of School (fictional)",
    publishedAt: "2026-06-25",
    body: [
      textBlock(
        "The admissions pages demonstrate how an enquiry flow can be explained clearly: ask a question, receive a response, visit and then apply.",
        "admissions-1",
      ),
      textBlock("Built to be replaced", "admissions-2", "h2"),
      textBlock(
        "Dates, fees and entry criteria are intentionally absent. Swap in real school information and connect the forms to live endpoints before launch.",
        "admissions-3",
      ),
    ],
  },
];

export const demoBlogCards: SanityBlogCard[] = demoBlogPosts.map((post) => ({
  _id: post._id,
  title: post.title,
  slug: post.slug,
  excerpt: post.excerpt,
  coverImageUrl: post.coverImageUrl,
  coverImageAlt: post.coverImageAlt,
  categoryTitle: post.categoryTitle,
  categorySlug: post.categorySlug,
  categoryRef: post.categoryRef,
  authorName: post.authorName,
  publishedAt: post.publishedAt,
  featured: post.featured,
}));

export const demoAchievements: SanityAchievement[] = [
  {
    _id: "demo-achievement-symposium",
    title: "Year 12 research symposium",
    slug: "year-12-research-symposium",
    description:
      "A fictional showcase of student research questions, posters and short presentations.",
    category: "Academic",
    achievementDate: "2026-06-12",
    coverImageUrl: demoImages.academics.src,
    coverImageAlt: demoImages.academics.alt,
    featured: true,
  },
  {
    _id: "demo-achievement-debate",
    title: "Debate team showcase",
    slug: "debate-team-showcase",
    description:
      "A fictional event celebrating prepared arguments, careful listening and respectful disagreement.",
    category: "Academic",
    achievementDate: "2026-05-21",
    coverImageUrl: demoImages.classroom.src,
    coverImageAlt: demoImages.classroom.alt,
    featured: true,
  },
  {
    _id: "demo-achievement-football",
    title: "Senior football cup run",
    slug: "senior-football-cup-run",
    description:
      "A fictional season retrospective focused on teamwork and improvement rather than a claimed title.",
    category: "Sports",
    achievementDate: "2026-04-18",
    coverImageUrl: demoImages.sports.src,
    coverImageAlt: demoImages.sports.alt,
    featured: true,
  },
  {
    _id: "demo-achievement-exhibition",
    title: "Annual studio exhibition",
    slug: "annual-studio-exhibition",
    description:
      "A fictional exhibition of student paintings, photographs and mixed-media work.",
    category: "Arts & Culture",
    achievementDate: "2026-03-27",
    coverImageUrl: demoImages.arts.src,
    coverImageAlt: demoImages.arts.alt,
    featured: true,
  },
  {
    _id: "demo-achievement-garden",
    title: "Community garden project",
    slug: "community-garden-project",
    description:
      "A fictional service project connecting classroom science with families and local partners.",
    category: "Community",
    achievementDate: "2026-02-14",
    coverImageUrl: demoImages.community.src,
    coverImageAlt: demoImages.community.alt,
    featured: true,
  },
  {
    _id: "demo-achievement-science-fair",
    title: "Science fair innovation display",
    slug: "science-fair-innovation-display",
    description:
      "A fictional fair where students presented experiments and design ideas to visitors.",
    category: "Academic",
    achievementDate: "2026-01-30",
    coverImageUrl: demoImages.library.src,
    coverImageAlt: demoImages.library.alt,
    featured: true,
  },
];

export const demoGalleryItems: SanityGalleryItem[] = [
  {
    _id: "demo-gallery-hero",
    title: "The academy building",
    slug: "the-academy-building",
    imageUrl: demoImages.hero.src,
    altText: demoImages.hero.alt,
    category: "Campus",
    eventDate: "2026-10-02",
    featured: true,
  },
  {
    _id: "demo-gallery-classroom",
    title: "A morning in class",
    slug: "a-morning-in-class",
    imageUrl: demoImages.classroom.src,
    altText: demoImages.classroom.alt,
    category: "Academics",
    eventDate: "2026-10-04",
    featured: true,
  },
  {
    _id: "demo-gallery-library",
    title: "Library corner",
    slug: "library-corner",
    imageUrl: demoImages.library.src,
    altText: demoImages.library.alt,
    category: "Campus",
    eventDate: "2026-09-28",
    featured: true,
  },
  {
    _id: "demo-gallery-laboratory",
    title: "Laboratory work",
    slug: "laboratory-work",
    imageUrl: demoImages.academics.src,
    altText: demoImages.academics.alt,
    category: "Academics",
    eventDate: "2026-09-18",
    featured: true,
  },
  {
    _id: "demo-gallery-collaboration",
    title: "Group project",
    slug: "group-project",
    imageUrl: demoImages.collaboration.src,
    altText: demoImages.collaboration.alt,
    category: "Academics",
    eventDate: "2026-09-11",
    featured: true,
  },
  {
    _id: "demo-gallery-sports",
    title: "On the field",
    slug: "on-the-field",
    imageUrl: demoImages.sports.src,
    altText: demoImages.sports.alt,
    category: "Sports",
    eventDate: "2026-08-30",
    featured: true,
  },
  {
    _id: "demo-gallery-arts",
    title: "Studio afternoon",
    slug: "studio-afternoon",
    imageUrl: demoImages.arts.src,
    altText: demoImages.arts.alt,
    category: "Arts",
    eventDate: "2026-08-22",
  },
  {
    _id: "demo-gallery-campus",
    title: "Campus walkway",
    slug: "campus-walkway",
    imageUrl: demoImages.campus.src,
    altText: demoImages.campus.alt,
    category: "Campus",
    eventDate: "2026-08-15",
  },
  {
    _id: "demo-gallery-students",
    title: "Between lessons",
    slug: "between-lessons",
    imageUrl: demoImages.introduction.src,
    altText: demoImages.introduction.alt,
    category: "Community",
    eventDate: "2026-07-29",
  },
  {
    _id: "demo-gallery-community",
    title: "Community gathering",
    slug: "community-gathering",
    imageUrl: demoImages.community.src,
    altText: demoImages.community.alt,
    category: "Community",
    eventDate: "2026-07-12",
  },
];
