import { defineQuery } from "next-sanity";

const blogFieldsInner = `
  _id,
  title,
  "slug": slug.current,
  excerpt,
  "coverImageUrl": coverImage.asset->url,
  "coverImageAlt": coverImage.alt,
  "categoryTitle": category->title,
  "categorySlug": category->slug.current,
  "categoryRef": category._ref,
  "authorName": author->name,
  publishedAt,
  featured
`;

const blogFields = `{${blogFieldsInner}}`;

export const blogListQuery = defineQuery(`*[
  _type == "blog"
  && !(_id in path("drafts.**"))
  && defined(slug.current)
]|order(publishedAt desc)${blogFields}`);

export const featuredBlogsQuery = defineQuery(`*[
  _type == "blog"
  && !(_id in path("drafts.**"))
  && defined(slug.current)
  && featured == true
]|order(publishedAt desc)[0...3]${blogFields}`);

export const blogBySlugQuery = defineQuery(`*[
  _type == "blog"
  && !(_id in path("drafts.**"))
  && slug.current == $slug
][0]{
  ${blogFieldsInner},
  body,
  seoTitle,
  seoDescription,
  "authorDesignation": author->designation,
  "authorProfileImageUrl": author->profileImage.asset->url,
  "authorBiography": author->biography
}`);

export const relatedBlogsQuery = defineQuery(`*[
  _type == "blog"
  && !(_id in path("drafts.**"))
  && defined(slug.current)
  && slug.current != $slug
  && (category._ref == $categoryRef || $categoryRef == null)
]|order(publishedAt desc)[0...3]${blogFields}`);

export const blogCategoriesQuery = defineQuery(`*[
  _type == "category"
  && !(_id in path("drafts.**"))
  && defined(slug.current)
]|order(title asc){_id, title, "slug": slug.current, description}`);

const achievementFields = `{
  _id,
  title,
  "slug": slug.current,
  description,
  category,
  achievementDate,
  "coverImageUrl": coverImage.asset->url,
  "coverImageAlt": coverImage.alt,
  featured
}`;

export const achievementListQuery = defineQuery(`*[
  _type == "achievement"
  && !(_id in path("drafts.**"))
  && defined(slug.current)
]|order(achievementDate desc)${achievementFields}`);

export const featuredAchievementsQuery = defineQuery(`*[
  _type == "achievement"
  && !(_id in path("drafts.**"))
  && defined(slug.current)
]|order(achievementDate desc)[0...3]${achievementFields}`);

const galleryFields = `{
  _id,
  title,
  "slug": slug.current,
  "imageUrl": image.asset->url,
  altText,
  category,
  eventDate,
  featured
}`;

export const galleryListQuery = defineQuery(`*[
  _type == "gallery"
  && !(_id in path("drafts.**"))
  && defined(slug.current)
]|order(eventDate desc)${galleryFields}`);

export const featuredGalleryQuery = defineQuery(`*[
  _type == "gallery"
  && !(_id in path("drafts.**"))
  && defined(slug.current)
]|order(eventDate desc)[0...6]${galleryFields}`);
