import rss, { type RSSFeedItem } from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE_TITLE, SITE_DESCRIPTION } from "../consts";
import { collectionMetadataMap } from "../consts";
import sanitizeHtml from "sanitize-html";
import { markdownToHtml } from "satteri";
import { getImage } from "astro:assets";
import type { APIContext, ImageMetadata } from "astro";

const images = import.meta.glob<{ default: ImageMetadata }>(
  "../assets/**/*.{jpg,jpeg,png,gif,webp}",
);

const MAX_FEED_IMAGE_WIDTH = 1280;

async function renderForFeed(body: string, site: URL) {
  let { html } = await markdownToHtml(body, { features: { math: false } });
  const sources = new Set(
    [...html.matchAll(/<img src="((?:\.\.\/+)+assets\/[^"]+)"/g)].map((match) => match[1]),
  );
  for (const src of sources) {
    const load = images[decodeURI(src).replace(/\/+/g, "/").replace(/^(\.\.\/)+/, "../")];
    if (!load) {
      console.warn(`RSS: could not resolve image ${src}`);
      continue;
    }
    const image = (await load()).default;
    const { src: built } = await getImage({
      src: image,
      width: Math.min(image.width, MAX_FEED_IMAGE_WIDTH),
    });
    html = html.replaceAll(`"${src}"`, `"${new URL(built, site)}"`);
  }
  return sanitizeHtml(html, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      img: ["src", "alt", "width", "height"],
      li: ["id"],
      a: ["href", "id"],
    },
  });
}

export async function GET(context: APIContext) {
  const site = context.site ?? new URL("https://rwblickhan.org");
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
        title: post.data.title,
        pubDate: post.data.lastUpdatedDate,
        content: await renderForFeed(post.body, site),
        link: `${metadata.slug}/${post.id}/`,
      });
    }
  }
  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    stylesheet: "pretty-feed-v3.xsl",
    site,
    items,
  });
}
