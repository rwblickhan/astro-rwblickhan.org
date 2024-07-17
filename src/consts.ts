import type { Collection } from "./content/config";

export const SITE_TITLE = "R. W. Blickhan";
export const SITE_DESCRIPTION = "The personal site of R.W. Blickhan";

export interface CollectionMetadata {
  title: string;
  slug: string;
  isInHeader: boolean;
  isInRSSFeed: boolean;
}

export const collectionMetadataMap: Map<Collection, CollectionMetadata> =
  new Map([
    [
      "fiction",
      {
        title: "Fiction",
        slug: "/fiction",
        isInHeader: true,
        isInRSSFeed: true,
      },
    ],
    [
      "poetry",
      {
        title: "Poetry",
        slug: "/poetry",
        isInHeader: true,
        isInRSSFeed: true,
      },
    ],
    [
      "essays",
      { title: "Essays", slug: "/essays", isInHeader: true, isInRSSFeed: true },
    ],
    [
      "technical",
      {
        title: "Technical",
        slug: "/technical",
        isInHeader: true,
        isInRSSFeed: true,
      },
    ],
    [
      "tilTechnical",
      {
        title: "TIL",
        slug: "/technical/til",
        isInHeader: false,
        isInRSSFeed: true,
      },
    ],
    [
      "misc",
      { title: "Misc", slug: "/misc", isInHeader: true, isInRSSFeed: true },
    ],
    [
      "newsletters",
      {
        title: "Newsletters",
        slug: "/newsletters",
        isInHeader: true,
        isInRSSFeed: true,
      },
    ],
    [
      "logs",
      { title: "Logs", slug: "/logs", isInHeader: true, isInRSSFeed: false },
    ],
    [
      "recipes",
      {
        title: "Recipes",
        slug: "/misc/recipes",
        isInHeader: false,
        isInRSSFeed: true,
      },
    ],
  ]);

export const collectionWithGalleryMetadataMap: Map<
  Collection | "gallery",
  CollectionMetadata
> = new Map([
  ...collectionMetadataMap,
  [
    "gallery",
    {
      title: "Gallery",
      slug: "/gallery",
      isInHeader: true,
      isInRSSFeed: false,
    },
  ],
]);
