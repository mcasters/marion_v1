import React from "react";
import PostComponent from "@/components/post/postComponent";
import { PostFull } from "@/lib/type";
import { getPostsFull } from "@/app/actions/posts";

export default async function Posts() {
  const posts = await getPostsFull();

  return (
    posts.length > 0 &&
    posts.map((post: PostFull) => <PostComponent key={post.id} post={post} />)
  );
}
