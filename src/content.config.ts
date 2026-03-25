import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const creativeWriting = defineCollection({
  loader: glob({
    pattern: ["**/*.md", "**/*.mdx"],
    base: "./src/content/creativewriting",
  }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    type: z.enum(["fiction", "poetry"]).default("fiction"),
    lastUpdatedDate: z
      .string()
      .or(z.date())
      .transform((val) => new Date(val)),
  }),
});

const technical = defineCollection({
  loader: glob({
    pattern: ["**/*.md", "**/*.mdx"],
    base: "./src/content/technical",
  }),
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
  loader: glob({
    pattern: ["**/*.md", "**/*.mdx"],
    base: "./src/content/logs",
  }),
  schema: z.object({
    title: z.string(),
    lastUpdatedDate: z
      .string()
      .or(z.date())
      .transform((val) => new Date(val)),
  }),
});

const evergreen = defineCollection({
  loader: glob({
    pattern: ["**/*.md", "**/*.mdx"],
    base: "./src/content/evergreen",
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    lastUpdatedDate: z
      .string()
      .or(z.date())
      .transform((val) => new Date(val)),
  }),
});

const newsletters = defineCollection({
  loader: glob({
    pattern: ["**/*.md", "**/*.mdx"],
    base: "./src/content/newsletters",
  }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    lastUpdatedDate: z
      .string()
      .or(z.date())
      .transform((val) => new Date(val)),
    publicationDate: z
      .string()
      .or(z.date())
      .transform((val) => new Date(val)),
    season: z.number(),
  }),
});

export const collections = {
  creativeWriting,
  technical,
  logs,
  evergreen,
  newsletters,
};

export type Collection = keyof typeof collections;
