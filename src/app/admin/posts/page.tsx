import PostForm from "@/components/admin/form/PostForm";
import PostListComponent from "@/components/admin/post/PostListComponent";
import { getPostsFull } from "@/app/api/post/getPosts";
import s from "@/styles/admin/Admin.module.css";
import React from "react";

export default async function Sculptures() {
  const posts = await getPostsFull();

  return (
    <>
      <h1 className={s.pageTitle}>Contenus de la page Posts</h1>
      <PostListComponent posts={posts} />
      <PostForm />
    </>
  );
}