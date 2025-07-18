import React from "react";
import PostComponent from "@/components/post/postComponent";
import { PostFull } from "@/lib/type";

import { getPostsFull } from "@/app/actions/item-post";
import { Metadata } from "next";
import { getMetaMap } from "@/utils/commonUtils.ts";
import { getMetas } from "@/app/actions/meta";
import { META } from "@/constants/admin.ts";

export async function generateMetadata(): Promise<Metadata | undefined> {
  const metas = getMetaMap(await getMetas());
  if (metas) {
    return {
      title: metas.get(META.DOCUMENT_TITLE_POST),
      description: metas.get(META.DESCRIPTION_POST),
      openGraph: {
        title: metas.get(META.DOCUMENT_TITLE_POST),
        description: metas.get(META.DESCRIPTION_POST),
        url: metas.get(META.URL),
        siteName: metas.get(META.SEO_SITE_TITLE),
        locale: "fr",
        type: "website",
      },
    };
  }
}

export default async function Posts() {
  const posts = await getPostsFull();

  return (
    <>
      <h1 className="hidden">Posts</h1>
      {posts.length > 0 &&
        posts.map((post: PostFull) => (
          <PostComponent key={post.id} post={post} />
        ))}
    </>
  );
}
