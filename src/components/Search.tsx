import Fuse from "fuse.js";
import { useState, useEffect } from "preact/hooks";
import type { IndexEntry } from "../consts";

export default function Search() {
  const [fuse, setFuse] = useState<Fuse<IndexEntry>>();
  const [query, setQuery] = useState("");
  useEffect(() => {
    async function runEffect() {
      const index = await fetch("./index.json").then((response) =>
        response.json()
      );
      setFuse(
        new Fuse(index, {
          keys: ["slug", "title", "body"],
          includeMatches: true,
          minMatchCharLength: 2,
          threshold: 0.5,
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
    fuse
      ?.search(query)
      .map((result) => result)
      .slice(0, 5) ?? [];

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
              <a href={`${result.item.slug}`}>{result.item.title}</a>
              {result.item.body}
            </li>
          ))}
      </ul>
    </>
  );
}
