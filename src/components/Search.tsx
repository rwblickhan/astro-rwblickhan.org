import Fuse from "fuse.js";
import { useState, useEffect } from "preact/hooks";
import type { IndexEntry } from "../consts";
import FuseHighlight from "./FuseHighlight";

export default function Search() {
  const [index, setIndex] = useState<IndexEntry[]>([]);
  const [fuse, setFuse] = useState<Fuse<IndexEntry>>();
  const [query, setQuery] = useState("");
  const [rawResults, setRawResults] = useState<Fuse.FuseResult<IndexEntry>[]>(
    []
  );
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function runEffect() {
      const loadedIndex = await fetch("index.json").then((response) =>
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

  useEffect(() => {
    setLoading(true);
    const getResults = setTimeout(() => {
      setLoading(false);
      setRawResults(fuse?.search("'" + query) ?? []);
    }, 500);

    return () => clearTimeout(getResults);
  }, [query]);

  function handleOnSearch(handler: any) {
    const { value } = handler.target;
    setQuery(value);
  }

  const results: Fuse.FuseResult<IndexEntry>[] = (
    query.length === 0 ? [] : rawResults ?? []
  ).sort((a, b) =>
    (a.matches?.filter((match) => match.key === "body")[0]?.indices.length ??
      0) >
    (b.matches?.filter((match) => match.key === "body")[0]?.indices.length ?? 0)
      ? -1
      : 1
  );

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
      {loading && "Loading..."}
      {!loading && query.length > 1 && (
        <p>
          Found {results.length} {results.length === 1 ? "result" : "results"}{" "}
          for '{query}'
        </p>
      )}
      <ul>
        {!loading &&
          results &&
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
