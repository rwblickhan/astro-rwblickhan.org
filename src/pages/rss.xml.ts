import rss, { type RSSFeedItem } from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE_TITLE, SITE_DESCRIPTION } from "../consts";
import { collectionMetadataMap } from "../consts";
import sanitizeHtml from "sanitize-html";
import MarkdownIt from "markdown-it";
import type { APIContext } from "astro";
const parser = new MarkdownIt();

export async function GET(context: APIContext) {
  const items: RSSFeedItem[] = [];
  for (const [collection, metadata] of collectionMetadataMap.entries()) {
    if (!metadata.isInRSSFeed) {
      continue;
    }

    const posts = await getCollection(collection);
    for (const post of posts) {
      if (post.body === undefined) {
        console.log(`Skipping ${post.id} because it has no body`);
        continue;
      }
      items.push({
        title:
          collection === "tilTechnical"
            ? `TIL: ${post.data.title}`
            : post.data.title,
        pubDate: post.data.lastUpdatedDate,
        content: sanitizeHtml(parser.render(post.body)),
        link: `${metadata.slug}/${post.id}/`,
      });
    }
  }
  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    stylesheet: "pretty-feed-v3.xsl",
    site: context.site ?? new URL("https://rwblickhan.org"),
    items,
  });
}
