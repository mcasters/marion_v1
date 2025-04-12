import ListComponent from "@/components/admin/item/listComponent";
import s from "@/components/admin/admin.module.css";
import React from "react";
import { getPostsFull } from "@/app/actions/item-post";

export default async function Sculptures() {
  const posts = await getPostsFull();

  return (
    <>
      <h1 className={s.title1}>Les posts</h1>
      <div className={s.container}>
        <h2 className={s.title2}>Liste des posts</h2>
        <ListComponent items={posts} />
      </div>
    </>
  );
}
