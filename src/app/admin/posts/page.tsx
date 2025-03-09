import PostForm from "@/components/admin/form/PostForm";
import PostListComponent from "@/components/admin/post/PostListComponent";
import s from "@/styles/admin/Admin.module.css";
import React from "react";
import { getEmptyPost } from "@/utils/commonUtils";
import { getPostsFull } from "@/app/actions/posts";

export default async function Sculptures() {
  const posts = await getPostsFull();

  return (
    <>
      <h1 className={s.title1}>Les posts</h1>
      <PostListComponent posts={posts} />
      <PostForm post={getEmptyPost()} />
    </>
  );
}
