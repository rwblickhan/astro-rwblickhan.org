import Fuse from "fuse.js";
import { useState, useEffect } from "preact/hooks";
import type { IndexEntry } from "../consts";
import FuseHighlight from "./FuseHighlight";

export default function Search() {
  const [index, setIndex] = useState<IndexEntry[]>([]);
  const [fuse, setFuse] = useState<Fuse<IndexEntry>>();
  const [query, setQuery] = useState("");
  useEffect(() => {
    async function runEffect() {
      const loadedIndex = await fetch("./index.json").then((response) =>
        response.json()
      );
      setIndex(loadedIndex);
      setFuse(
        new Fuse(loadedIndex, {
          keys: ["body"],
          includeMatches: true,
          includeScore: true,
          ignoreLocation: true,
          useExtendedSearch: true,
        })
      );
    }
    runEffect();
  }, []);

  function handleOnSearch(handler: any) {
    const { value } = handler.target;
    setQuery(value);
  }

  const results: Fuse.FuseResult<IndexEntry>[] =
    query.length === 0 ? [] : fuse?.search("'" + query) ?? [];

  return (
    <>
      <div class="bg-rwb-slate-light dark:bg-neutral-800 my-4 px-5 pt-4 pb-1.5 max-w-3xl mx-auto rounded">
        <label>Search:</label>
        <input
          type="text"
          value={query}
          placeholder="Search content"
          onInput={handleOnSearch}
          class="block mb-4 px-4 py-3 w-full bg-white dark:bg-neutral-900 border border-slate-400 rounded"
        />
      </div>
      {query.length > 1 && (
        <p>
          Found {results.length} {results.length === 1 ? "result" : "results"}{" "}
          for '{query}'
        </p>
      )}
      <ul>
        {results &&
          results.map((result) => (
            <li>
              <a href={`${index[result.refIndex].slug}`}>
                {index[result.refIndex].title}
              </a>
              <FuseHighlight body={result.item.body} matches={result.matches} />
            </li>
          ))}
      </ul>
    </>
  );
}
