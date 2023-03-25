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
      <label>Search</label>
      <input
        type="text"
        value={query}
        onChange={handleOnSearch}
        placeholder="Search content"
      />
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
