import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE_TITLE, SITE_DESCRIPTION } from "../consts";

export async function get(context) {
  const fictionPosts = await getCollection("fiction");
  const essaysPosts = await getCollection("essays");
  const technicalPosts = await getCollection("technical");
  const miscPosts = await getCollection("misc");
  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: fictionPosts
      .map((post) => ({
        title: post.data.title,
        pubDate: post.data.lastUpdatedDate,
        description: post.data.description,
        link: `/fiction/${post.slug}/`,
      }))
      .concat(
        essaysPosts.map((post) => ({
          title: post.data.title,
          pubDate: post.data.lastUpdatedDate,
          description: post.data.description,
          link: `/essays/${post.slug}/`,
        }))
      )
      .concat(
        technicalPosts.map((post) => ({
          title: post.data.title,
          pubDate: post.data.lastUpdatedDate,
          description: post.data.description,
          link: `/technical/${post.slug}/`,
        }))
      )
      .concat(
        miscPosts.map((post) => ({
          title: post.data.title,
          pubDate: post.data.lastUpdatedDate,
          description: post.data.description,
          link: `/misc/${post.slug}/`,
        }))
      ),
  });
}
