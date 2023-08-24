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

const collections = {
  fiction,
  essays,
  technical,
  til,
  logs,
  misc,
  recipes,
};

export type Collection = keyof typeof collections;
