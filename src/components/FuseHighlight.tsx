import type Fuse from "fuse.js";

const CONTEXT_RANGE = 20;

export interface Props {
  body: string;
  matches?: readonly Fuse.FuseResultMatch[];
}

export default function FuseHighlight({ body, matches }: Props) {
  function renderOverlappingMatch(
    body: string,
    indexTuples: [number, number][]
  ) {
    const firstTuple = indexTuples[0];
    const lastTuple = indexTuples[indexTuples.length - 1];
    let elements: preact.JSX.Element[] = [];
    if (firstTuple[0] - CONTEXT_RANGE > 0) {
      elements.push(<span>...</span>);
    }
    elements.push(
      <span>
        {body.substring(firstTuple[0] - CONTEXT_RANGE, firstTuple[0])}
      </span>
    );
    while (indexTuples.length > 0) {
      const leadingTuple = indexTuples.shift();
      const maybeTrailingTuple = indexTuples.shift();

      if (leadingTuple === undefined) {
        break;
      }

      elements.push(
        <span>
          <mark>{body.substring(leadingTuple[0], leadingTuple[1] + 1)}</mark>
        </span>
      );

      if (maybeTrailingTuple === undefined) {
        break;
      }

      elements.push(
        <span>
          {body.substring(leadingTuple[1] + 1, maybeTrailingTuple[0])}
        </span>
      );
      indexTuples.unshift(maybeTrailingTuple);
    }
    elements.push(
      <span>
        {body.substring(lastTuple[1] + 1, lastTuple[1] + CONTEXT_RANGE)}
      </span>
    );
    if (lastTuple[1] + CONTEXT_RANGE < body.length) {
      elements.push(<span>...</span>);
    }
    return elements;
  }

  if (!matches) {
    return <p>{body}</p>;
  }

  let elements: preact.JSX.Element[] = [];
  for (const match of matches) {
    if (match.key !== "body") {
      continue;
    }

    let indexTuples = match.indices.map((val) => val);
    while (indexTuples.length > 0) {
      let leadingTuple = indexTuples.shift();
      if (leadingTuple === undefined) {
        break;
      }

      let overlappingTuples = [leadingTuple];
      let lastTuple = leadingTuple;

      while (true) {
        const tuple = indexTuples.shift();

        if (tuple === undefined) {
          break;
        }

        if (tuple[0] < lastTuple[1] + CONTEXT_RANGE) {
          overlappingTuples.push(tuple);
          lastTuple = tuple;
          continue;
        }
        indexTuples.unshift(tuple);
        break;
      }

      // Render overlapping matches
      elements = elements.concat(
        renderOverlappingMatch(body, overlappingTuples)
      );
    }
  }

  return <div>{elements}</div>;
}
