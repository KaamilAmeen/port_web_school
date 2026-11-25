/**
 * Fallback records used when the CMS has no published content.
 *
 * These records use `demo-` prefixed IDs so they can be distinguished from
 * published Sanity documents. Published content always takes priority.
 */

import { demoImages } from "@/content/images";
import type {
  SanityAchievement,
  SanityBlogCard,
  SanityBlogPost,
  SanityCategory,
  SanityGalleryItem,
} from "@/lib/types/sanity";

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
    description: "Stories about teaching, study and discovery across the school.",
  },
  {
    _id: "demo-category-campus",
    title: "Campus",
    slug: "campus",
    description: "Stories about the spaces, activities and people that make up campus life.",
  },
  {
    _id: "demo-category-community",
    title: "Community",
    slug: "community",
    description: "Stories about partnerships, service and the wider school community.",
  },
  {
    _id: "demo-category-achievements",
    title: "Achievements",
    slug: "achievements",
    description: "Highlights of student work, events and shared success.",
  },
];

export const demoBlogPosts: SanityBlogPost[] = [
  {
    _id: "demo-blog-inquiry",
    title: "How inquiry shapes a Monday morning",
    slug: "how-inquiry-shapes-a-monday-morning",
    excerpt:
      "How questions, discussion and practical work set the tone for a week of learning.",
    coverImageUrl: demoImages.classroom.src,
    coverImageAlt: demoImages.classroom.alt,
    categoryTitle: "Learning",
    categorySlug: "learning",
    categoryRef: "demo-category-learning",
    authorName: "Dr. Elaine Hartwell",
    authorDesignation: "Head of School",
    authorBiography: "Elaine leads the school with a focus on thoughtful teaching and student wellbeing.",
    authorProfileImageUrl: null,
    publishedAt: "2026-10-18",
    featured: true,
    body: [
      textBlock(
        "The first lesson of the week is rarely the loudest. At Aurelia Academy, Monday mornings often begin with a question on the board and a short conversation about what students already notice.",
        "inquiry-1",
      ),
      textBlock("Questions before answers", "inquiry-2", "h2"),
      textBlock(
        "Teachers use open prompts to invite hypotheses. Students compare ideas, test them against what they know and decide what evidence would help them move forward.",
        "inquiry-3",
      ),
      textBlock(
        "Curiosity becomes a routine rather than a special event, and students learn to enjoy the process of finding out.",
        "inquiry-4",
      ),
    ],
  },
  {
    _id: "demo-blog-library",
    title: "Inside the library: a space for thinking",
    slug: "inside-the-library-a-space-for-thinking",
    excerpt:
      "A closer look at the reading corners, group tables and quiet spots that make a library feel alive.",
    coverImageUrl: demoImages.library.src,
    coverImageAlt: demoImages.library.alt,
    categoryTitle: "Learning",
    categorySlug: "learning",
    categoryRef: "demo-category-learning",
    authorName: "Ms. Priya Raman",
    authorDesignation: "Head of Academics",
    authorBiography: "Priya oversees the curriculum and supports teachers in creating rich learning experiences.",
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
        "Quiet reading areas sit alongside shared tables and a making space. The library supports reading, research and collaboration in one welcoming place.",
        "library-3",
      ),
      textBlock(
        "Students are encouraged to choose their own next book, ask a question of a librarian or work with a partner on a new idea.",
        "library-4",
      ),
    ],
  },
  {
    _id: "demo-blog-belonging",
    title: "The house system and the art of belonging",
    slug: "the-house-system-and-the-art-of-belonging",
    excerpt:
      "How a house system helps students find friends, mentors and a sense of place.",
    coverImageUrl: demoImages.community.src,
    coverImageAlt: demoImages.community.alt,
    categoryTitle: "Community",
    categorySlug: "community",
    categoryRef: "demo-category-community",
    authorName: "Ms. Sofia Marin",
    authorDesignation: "Head of Pastoral Care",
    authorBiography: "Sofia leads pastoral care, helping every student feel known, supported and connected.",
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
        "Our house system gives students across year groups a way to meet, share responsibilities and celebrate one another.",
        "belonging-3",
      ),
      textBlock(
        "It is built around the everyday moments that make a school feel like a community.",
        "belonging-4",
      ),
    ],
  },
  {
    _id: "demo-blog-science",
    title: "A term of science experiments",
    slug: "a-term-of-science-experiments",
    excerpt:
      "Notes from a laboratory where small experiments lead to bigger questions.",
    coverImageUrl: demoImages.academics.src,
    coverImageAlt: demoImages.academics.alt,
    categoryTitle: "Learning",
    categorySlug: "learning",
    categoryRef: "demo-category-learning",
    authorName: "Ms. Priya Raman",
    authorDesignation: "Head of Academics",
    publishedAt: "2026-09-10",
    body: [
      textBlock(
        "The best experiments often begin with something simple: a prediction, a careful measurement and a result that does not quite fit.",
        "science-1",
      ),
      textBlock("Learning from the unexpected", "science-2", "h2"),
      textBlock(
        "Students keep notebooks of predictions and reflections, then compare their findings with classmates.",
        "science-3",
      ),
    ],
  },
  {
    _id: "demo-blog-sport",
    title: "On the sports field: lessons beyond winning",
    slug: "on-the-sports-field-lessons-beyond-winning",
    excerpt:
      "A reflection on teamwork, practice and the value of showing up for one another.",
    coverImageUrl: demoImages.sports.src,
    coverImageAlt: demoImages.sports.alt,
    categoryTitle: "Campus",
    categorySlug: "campus",
    categoryRef: "demo-category-campus",
    authorName: "Mr. Daniel Okafor",
    authorDesignation: "Deputy Head",
    publishedAt: "2026-08-28",
    body: [
      textBlock(
        "Sport offers a visible lesson in practice. Progress is usually gradual, built through repeated small efforts that few people see.",
        "sport-1",
      ),
      textBlock("What the scoreboard misses", "sport-2", "h2"),
      textBlock(
        "Our focus is on collaboration and resilience as much as results, because the habits learned on the field travel into the classroom and beyond.",
        "sport-3",
      ),
    ],
  },
  {
    _id: "demo-blog-studio",
    title: "Studio notes: students explain their work",
    slug: "studio-notes-students-explain-their-work",
    excerpt:
      "Thoughts from an art studio where process matters as much as the finished piece.",
    coverImageUrl: demoImages.arts.src,
    coverImageAlt: demoImages.arts.alt,
    categoryTitle: "Campus",
    categorySlug: "campus",
    categoryRef: "demo-category-campus",
    authorName: "Ms. Sofia Marin",
    authorDesignation: "Head of Pastoral Care",
    publishedAt: "2026-08-14",
    body: [
      textBlock(
        "In the studio, students learn to talk about choices: why a colour was layered, why a shape was moved, why a first idea was abandoned.",
        "studio-1",
      ),
      textBlock("Process as a story", "studio-2", "h2"),
      textBlock(
        "Giving students a voice helps them explain their thinking and take pride in the decisions behind their work.",
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
      "A photo essay route through libraries, courtyards and playing fields.",
    coverImageUrl: demoImages.campus.src,
    coverImageAlt: demoImages.campus.alt,
    categoryTitle: "Campus",
    categorySlug: "campus",
    categoryRef: "demo-category-campus",
    authorName: "Dr. Elaine Hartwell",
    authorDesignation: "Head of School",
    publishedAt: "2026-07-30",
    body: [
      textBlock(
        "A campus is best understood by walking through it: architecture first, then the spaces between buildings.",
        "campus-1",
      ),
      textBlock("From threshold to courtyard", "campus-2", "h2"),
      textBlock(
        "A route might begin at the entrance, pass the library and finish on the field as the light changes. Each space tells a different part of the school’s story.",
        "campus-3",
      ),
    ],
  },
  {
    _id: "demo-blog-garden",
    title: "Community garden project grows connections",
    slug: "community-garden-project-grows-connections",
    excerpt:
      "How a shared project can link science, service and families.",
    coverImageUrl: demoImages.introduction.src,
    coverImageAlt: demoImages.introduction.alt,
    categoryTitle: "Community",
    categorySlug: "community",
    categoryRef: "demo-category-community",
    authorName: "Mr. Daniel Okafor",
    authorDesignation: "Deputy Head",
    publishedAt: "2026-07-16",
    body: [
      textBlock(
        "A garden is a useful metaphor for community: it needs patience, shared responsibility and attention to seasons.",
        "garden-1",
      ),
      textBlock("A project with many roles", "garden-2", "h2"),
      textBlock(
        "This project brings together biology lessons, family volunteers and a simple service routine. Students learn to care for a living space while connecting classroom ideas with practical action.",
        "garden-3",
      ),
    ],
  },
  {
    _id: "demo-blog-admissions",
    title: "How our admissions process works",
    slug: "how-our-admissions-process-works",
    excerpt:
      "A clear guide to the enquiry journey, from a first question to an application.",
    coverImageUrl: demoImages.hero.src,
    coverImageAlt: demoImages.hero.alt,
    categoryTitle: "Learning",
    categorySlug: "learning",
    categoryRef: "demo-category-learning",
    authorName: "Dr. Elaine Hartwell",
    authorDesignation: "Head of School",
    publishedAt: "2026-06-25",
    body: [
      textBlock(
        "Our admissions pages explain the journey clearly: ask a question, receive a response, visit and then apply.",
        "admissions-1",
      ),
      textBlock("A conversation first", "admissions-2", "h2"),
      textBlock(
        "Each step is designed to give families the information they need and the chance to ask what matters most for their child.",
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
    title: "Grade 6 research showcase",
    slug: "grade-6-research-showcase",
    description:
      "A showcase of student research questions, posters and short presentations.",
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
      "An event celebrating prepared arguments, careful listening and respectful disagreement.",
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
      "A season retrospective focused on teamwork, commitment and steady improvement.",
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
      "An exhibition of student paintings, photographs and mixed-media work.",
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
      "A service project connecting classroom science with families and local partners.",
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
      "A fair where students presented experiments and design ideas to visitors.",
    category: "Academic",
    achievementDate: "2026-01-30",
    coverImageUrl: demoImages.library.src,
    coverImageAlt: demoImages.library.alt,
    featured: true,
  },
];

export const demoGalleryItems: SanityGalleryItem[] = [
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
    featured: true,
  },
  {
    _id: "demo-gallery-campus",
    title: "Campus walkway",
    slug: "campus-walkway",
    imageUrl: demoImages.campus.src,
    altText: demoImages.campus.alt,
    category: "Campus",
    eventDate: "2026-08-15",
    featured: true,
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
  {
    _id: "demo-gallery-hero",
    title: "The academy building",
    slug: "the-academy-building",
    imageUrl: demoImages.hero.src,
    altText: demoImages.hero.alt,
    category: "Campus",
    eventDate: "2026-10-02",
  },
];
