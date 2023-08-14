import { defineCollection, z } from "astro:content";

const fiction = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    lastUpdatedDate: z
      .string()
      .or(z.date())
      .transform((val) => new Date(val)),
  }),
});

const essays = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    lastUpdatedDate: z
      .string()
      .or(z.date())
      .transform((val) => new Date(val)),
  }),
});

const technical = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    lastUpdatedDate: z
      .string()
      .or(z.date())
      .transform((val) => new Date(val)),
  }),
});

const logs = defineCollection({
  schema: z.object({
    title: z.string(),
    lastUpdatedDate: z
      .string()
      .or(z.date())
      .transform((val) => new Date(val)),
  }),
});

const til = defineCollection({
  schema: z.object({
    title: z.string(),
    tags: z.array(z.string()),
    lastUpdatedDate: z
      .string()
      .or(z.date())
      .transform((val) => new Date(val)),
  }),
});

const misc = defineCollection({
  schema: z.object({
    title: z.string(),
    lastUpdatedDate: z
      .string()
      .or(z.date())
      .transform((val) => new Date(val)),
  }),
});

const recipes = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    lastUpdatedDate: z
      .string()
      .or(z.date())
      .transform((val) => new Date(val)),
  }),
});

const gallery = defineCollection({});

const collections = {
  fiction,
  essays,
  technical,
  til,
  logs,
  misc,
  recipes,
  gallery,
};

export type Collection = keyof typeof collections;

export interface CollectionMetadata {
  title: string;
  slug: string;
  isTopLevel: boolean;
}

export const collectionMetadataMap: Map<Collection, CollectionMetadata> =
  new Map([
    ["fiction", { title: "Fiction", slug: "/fiction", isTopLevel: true }],
    ["essays", { title: "Essays", slug: "/essays", isTopLevel: true }],
    ["technical", { title: "Technical", slug: "/technical", isTopLevel: true }],
    ["til", { title: "TIL", slug: "/technical/til", isTopLevel: false }],
    ["misc", { title: "Misc", slug: "/misc", isTopLevel: true }],
    ["logs", { title: "Logs", slug: "/logs", isTopLevel: true }],
    ["recipes", { title: "Recipes", slug: "/misc/recipes", isTopLevel: false }],
    ["gallery", { title: "Gallery", slug: "/gallery", isTopLevel: true }],
  ]);
