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

  const indexEntries: IndexEntry[] =
    fuse
      ?.search(query)
      .map((result) => result.item)
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
          Found {indexEntries.length}{" "}
          {indexEntries.length === 1 ? "result" : "results"} for '{query}'
        </p>
      )}
      <ul>
        {indexEntries &&
          indexEntries.map((indexEntry) => (
            <li>
              <a href={`${indexEntry.slug}`}>{indexEntry.title}</a>
              {indexEntry.body}
            </li>
          ))}
      </ul>
    </>
  );
}
