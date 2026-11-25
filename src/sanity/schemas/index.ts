import type { SchemaTypeDefinition } from "sanity";
import { achievement } from "./achievement";
import { announcement } from "./announcement";
import { author } from "./author";
import { blog } from "./blog";
import { blockContent } from "./block-content";
import { category } from "./category";
import { gallery } from "./gallery";

export const schemaTypes: SchemaTypeDefinition[] = [
  blockContent,
  blog,
  category,
  author,
  achievement,
  gallery,
  announcement,
];
