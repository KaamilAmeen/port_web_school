import { defineField, defineType } from "sanity";

export const announcement = defineType({
  name: "announcement",
  title: "Announcement",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "media", title: "Media" },
    { name: "publishing", title: "Publishing" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "content",
      validation: (rule) => rule.required().max(140),
      description: "Use a short, factual headline approved by the school.",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "content",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      group: "content",
      options: {
        list: ["General", "Academic", "Events", "Community"],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
      group: "content",
      rows: 3,
      validation: (rule) => rule.required().max(300),
      description: "A concise preview shown before the full announcement.",
    }),
    defineField({
      name: "body",
      title: "Announcement content",
      type: "blockContent",
      group: "content",
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      group: "media",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alternative text",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "publishedAt",
      title: "Published date",
      type: "datetime",
      group: "publishing",
      validation: (rule) => rule.required(),
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "expiresAt",
      title: "Expiry date",
      type: "datetime",
      group: "publishing",
      description: "Optional. The announcement stops appearing after this date.",
    }),
    defineField({
      name: "pinned",
      title: "Pin to top",
      type: "boolean",
      group: "publishing",
      initialValue: false,
    }),
    defineField({
      name: "featured",
      title: "Feature in previews",
      type: "boolean",
      group: "publishing",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category",
      media: "image",
    },
  },
});
