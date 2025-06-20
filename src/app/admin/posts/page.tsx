import s from "@/components/admin/admin.module.css";
import React from "react";
import { getPostsFull } from "@/app/actions/item-post";
import { getEmptyPost } from "@/utils/commonUtils";
import AddUpdateButton from "@/components/admin/form/addUpdateButton";
import ListComponent from "@/components/admin/form/item/listComponent";
import { Type } from "@/lib/type";

export default async function Posts() {
  const posts = await getPostsFull();

  return (
    <>
      <h1 className={s.title1}>Les posts</h1>
      <div className={s.container}>
        <h2 className={s.title2}>Liste des posts</h2>
        <ListComponent items={posts} type={Type.POST} />
        <AddUpdateButton item={getEmptyPost()} />
      </div>
    </>
  );
}
