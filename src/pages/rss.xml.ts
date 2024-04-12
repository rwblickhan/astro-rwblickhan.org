import rss, { type RSSFeedItem } from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE_TITLE, SITE_DESCRIPTION } from "../consts";
import { collectionMetadataMap } from "../consts";
import sanitizeHtml from "sanitize-html";
import MarkdownIt from "markdown-it";
const parser = new MarkdownIt();

export async function GET(context: any) {
  const items: RSSFeedItem[] = [];
  for (const [collection, metadata] of collectionMetadataMap.entries()) {
    if (!metadata.isInRSSFeed) {
      continue;
    }

    const posts = await getCollection(collection);
    for (const post of posts) {
      items.push({
        title:
          collection === "til" ? `TIL: ${post.data.title}` : post.data.title,
        pubDate: post.data.lastUpdatedDate,
        content: sanitizeHtml(parser.render(post.body)),
        link: `${metadata.slug}/${post.slug}/`,
      });
    }
  }
  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items,
  });
}
