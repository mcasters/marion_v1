import React from "react";
import PostComponent from "@/components/post/PostComponent";
import { PostFull } from "@/lib/db/item";
import { getPostsFull } from "@/app/actions/posts";

export default async function Posts() {
  const posts = await getPostsFull();

  return (
    posts.length > 0 &&
    posts.map((post: PostFull) => <PostComponent key={post.id} post={post} />)
  );
}
