import type { Collection } from "./content.config";

export const SITE_TITLE = "R. W. Blickhan";
export const SITE_DESCRIPTION = "The personal site of R.W. Blickhan";

export interface CollectionMetadata {
  title: string;
  slug: string;
  isInHeader: boolean;
  isInRSSFeed: boolean;
}

export const collectionMetadataMap: Map<Collection, CollectionMetadata> = new Map([
  [
    "creativeWriting",
    {
      title: "Creative Writing",
      slug: "/creativewriting",
      isInHeader: true,
      isInRSSFeed: true,
    },
  ],
  ["evergreen", { title: "Evergreen", slug: "/evergreen", isInHeader: true, isInRSSFeed: true }],
  [
    "newsletters",
    {
      title: "Newsletters",
      slug: "/newsletters",
      isInHeader: true,
      isInRSSFeed: true,
    },
  ],
  ["logs", { title: "Logs", slug: "/logs", isInHeader: true, isInRSSFeed: false }],
]);
