import s from "@/components/admin/admin.module.css";
import React from "react";
import { getPostsFull } from "@/app/actions/item-post";
import { getEmptyPost } from "@/lib/utils/commonUtils";
import AddButton from "@/components/admin/form/addButton.tsx";
import ListComponent from "@/components/admin/form/item/listComponent";
import { Type } from "@/lib/type";

export default async function Posts() {
  const posts = await getPostsFull();

  return (
    <div className={s.container}>
      <h1 className={s.title1}>Les posts</h1>
      <h2 className={s.title2}>Liste des posts</h2>
      <ListComponent items={posts} type={Type.POST} />
      <AddButton item={getEmptyPost()} />
    </div>
  );
}
