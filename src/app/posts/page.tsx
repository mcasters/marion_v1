import { getPostsFull } from "@/app/api/post/getPosts";
import React from "react";
import PostComponent from "@/components/post/PostComponent";
import { PostFull } from "@/lib/db/item";

export default async function Posts() {
  const posts = await getPostsFull();

  return (
    posts.length > 0 &&
    posts.map((post: PostFull) => <PostComponent key={post.id} post={post} />)
  );
}
