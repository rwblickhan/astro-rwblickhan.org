export const SITE_TITLE = "R. W. Blickhan";
export const SITE_DESCRIPTION = "The personal site of R.W. Blickhan";

export interface IndexEntry {
  slug: string;
  title: string;
  body: string;
}

export type SearchWorkerMessageType = "init" | "query";

export type SearchWorkerMessage =
  | {
      type: "init";
      index: IndexEntry[];
    }
  | {
      type: "query";
      query: string;
    };
