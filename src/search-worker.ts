import type { IndexEntry, SearchWorkerMessage } from "./consts";
import Fuse from "fuse.js";

let fuse: Fuse<IndexEntry> | null;

console.log("Search worker initialized");

self.onmessage = (e) => {
  const message = e.data as SearchWorkerMessage;
  if (message.type === "init") {
    fuse = new Fuse(message.index, {
      keys: ["body"],
      includeMatches: true,
      includeScore: true,
      ignoreLocation: true,
      useExtendedSearch: true,
    });
  } else if (message.type === "query") {
    /// Prepend `'` for an exact search
    postMessage(fuse?.search("'" + message.query) ?? []);
  } else {
    console.error(
      `Unexpected search worker message: ${JSON.stringify(e.data)}`
    );
  }
};
