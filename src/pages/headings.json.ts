import { getCollection, render } from "astro:content";
import { collectionMetadataMap } from "../consts";

export async function GET(context: any) {
  const allHeadings = [];
  for (const [collection, metadata] of collectionMetadataMap.entries()) {
    const posts = await getCollection(collection);
    const headings = (
      await Promise.all(
        posts.map((entry) => {
          return render(entry);
        })
      )
    ).flatMap(({ headings }) => headings);
    allHeadings.push(...headings);
  }
  return Response.json(allHeadings);
}
