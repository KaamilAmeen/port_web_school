import { defineField, defineType } from "sanity";

export const category = defineType({
  name: "category",
  title: "Blog category",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "content",
      validation: (rule) => rule.required().max(80),
      description: "Displayed on blog cards and filters.",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "content",
      options: { source: "title", maxLength: 80 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      group: "seo",
      rows: 3,
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "slug.current" },
  },
});
