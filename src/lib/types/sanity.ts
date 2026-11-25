export type SanitySlug = { current: string };

export type SanityBlogCard = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  coverImageUrl: string | null;
  coverImageAlt?: string;
  categoryTitle?: string;
  categorySlug?: string;
  categoryRef?: string;
  authorName?: string;
  publishedAt?: string;
  featured?: boolean;
};

export type SanityBlogPost = SanityBlogCard & {
  seoTitle?: string;
  seoDescription?: string;
  body?: unknown[];
  authorDesignation?: string;
  authorProfileImageUrl?: string | null;
  authorBiography?: string;
};

export type SanityAchievement = {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  category?: string;
  achievementDate?: string;
  coverImageUrl: string | null;
  coverImageAlt?: string;
  featured?: boolean;
};

export type SanityGalleryItem = {
  _id: string;
  title: string;
  slug: string;
  imageUrl: string | null;
  altText?: string;
  category?: string;
  eventDate?: string;
  featured?: boolean;
};

export type SanityCategory = {
  _id: string;
  title: string;
  slug: string;
  description?: string;
};
