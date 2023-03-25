import { getCollection } from "astro:content";

export async function get(context: any) {
  const fictionPosts = await getCollection("fiction");
  const essaysPosts = await getCollection("essays");
  const technicalPosts = await getCollection("technical");
  const miscPosts = await getCollection("misc");
  const logPosts = await getCollection("logs");
  const recipePosts = await getCollection("recipes");
  const body = JSON.stringify(
    fictionPosts
      .map((post) => {
        return {
          slug: `/fiction/${post.slug}`,
          title: post.data.title,
          body: post.body,
        };
      })
      .concat(
        essaysPosts.map((post) => {
          return {
            slug: `/essays/${post.slug}`,
            title: post.data.title,
            body: post.body,
          };
        })
      )
      .concat(
        technicalPosts.map((post) => {
          return {
            slug: `/technical/${post.slug}`,
            title: post.data.title,
            body: post.body,
          };
        })
      )
      .concat(
        miscPosts.map((post) => {
          return {
            slug: `/misc/${post.slug}`,
            title: post.data.title,
            body: post.body,
          };
        })
      )
      .concat(
        recipePosts.map((post) => {
          return {
            slug: `/misc/recipes/${post.slug}`,
            title: post.data.title,
            body: post.body,
          };
        })
      )
      .concat(
        logPosts.map((post) => {
          return {
            slug: `/logs/${post.slug}`,
            title: post.data.title,
            body: post.body,
          };
        })
      )
  );
  return { body };
}
