import { cache } from "react";
import { fetchPublished } from "@/sanity/lib/client";
import {
  achievementListQuery,
  blogBySlugQuery,
  blogCategoriesQuery,
  blogListQuery,
  featuredAchievementsQuery,
  featuredBlogsQuery,
  featuredGalleryQuery,
  galleryListQuery,
  relatedBlogsQuery,
} from "@/sanity/lib/queries";
import type {
  SanityAchievement,
  SanityBlogCard,
  SanityBlogPost,
  SanityCategory,
  SanityGalleryItem,
} from "@/lib/types/sanity";

export const getFeaturedAchievements = () =>
  fetchPublished<SanityAchievement[]>(featuredAchievementsQuery, {}, ["achievement"]);

export const getAchievements = () =>
  fetchPublished<SanityAchievement[]>(achievementListQuery, {}, ["achievement"]);

export const getFeaturedGallery = () =>
  fetchPublished<SanityGalleryItem[]>(featuredGalleryQuery, {}, ["gallery"]);

export const getGallery = () =>
  fetchPublished<SanityGalleryItem[]>(galleryListQuery, {}, ["gallery"]);

export const getRecentPosts = () =>
  fetchPublished<SanityBlogCard[]>(featuredBlogsQuery, {}, ["blog"]);

export const getBlogPosts = () =>
  fetchPublished<SanityBlogCard[]>(blogListQuery, {}, ["blog"]);

export const getBlogCategories = () =>
  fetchPublished<SanityCategory[]>(blogCategoriesQuery, {}, ["category"]);

export const getPostBySlug = cache((slug: string) =>
  fetchPublished<SanityBlogPost>(blogBySlugQuery, { slug }, ["blog"]),
);

export const getRelatedPosts = (slug: string, categoryRef: string | null) =>
  fetchPublished<SanityBlogCard[]>(
    relatedBlogsQuery,
    { slug, categoryRef },
    ["blog"],
  );
