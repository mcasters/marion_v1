import PostListComponent from "@/components/admin/post/PostListComponent";
import s from "@/components/admin/admin.module.css";
import React from "react";
import { getPostsFull } from "@/app/actions/posts";

export default async function Sculptures() {
  const posts = await getPostsFull();

  return (
    <>
      <h1 className={s.title1}>Les posts</h1>
      <PostListComponent posts={posts} />
    </>
  );
}
