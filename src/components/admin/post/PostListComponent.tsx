"use client";

import React from "react";
import style from "@/components/admin/admin.module.css";
import s from "@/components/admin/adminList.module.css";
import RowPostListComponent from "@/components/admin/post/RowPostListComponent";
import { PostFull } from "@/lib/type";

interface Props {
  posts?: PostFull[];
}
export default function PostListComponent({ posts }: Props) {
  const title = "Liste des posts";

  return (
    <div className={style.container}>
      <h2 className={style.title2}>{title}</h2>
      <div className={`${s.listWrapper} area`}>
        {posts &&
          posts.map((post: PostFull) => {
            return <RowPostListComponent key={post.id} post={post} />;
          })}
      </div>
    </div>
  );
}
