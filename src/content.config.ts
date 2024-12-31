import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const fiction = defineCollection({
  loader: glob({
    pattern: ["**/*.md", "**/*.mdx"],
    base: "./src/content/fiction",
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

const poetry = defineCollection({
  loader: glob({
    pattern: ["**/*.md", "**/*.mdx"],
    base: "./src/content/poetry",
  }),
  schema: z.object({
    title: z.string(),
    lastUpdatedDate: z
      .string()
      .or(z.date())
      .transform((val) => new Date(val)),
  }),
});

const essays = defineCollection({
  loader: glob({
    pattern: ["**/*.md", "**/*.mdx"],
    base: "./src/content/essays",
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

const tilTechnical = defineCollection({
  loader: glob({
    pattern: ["**/*.md", "**/*.mdx"],
    base: "./src/content/tilTechnical",
  }),
  schema: z.object({
    title: z.string(),
    tags: z.array(z.string()),
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

const misc = defineCollection({
  loader: glob({
    pattern: ["**/*.md", "**/*.mdx"],
    base: "./src/content/misc",
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
  fiction,
  poetry,
  essays,
  technical,
  tilTechnical,
  logs,
  misc,
  newsletters,
};

export type Collection = keyof typeof collections;
