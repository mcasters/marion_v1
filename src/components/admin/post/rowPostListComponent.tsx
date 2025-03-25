"use client";

import Image from "next/image";
import s from "../adminList.module.css";
import { PostFull } from "@/lib/type";
import { getMainImage } from "@/utils/commonUtils";
import { deletePost, updatePost } from "@/app/actions/posts/admin";
import DeleteButton from "@/components/admin/form/deleteButton";
import AddUpdateButton from "@/components/admin/form/addUpdateButton";
import React from "react";

interface Props {
  post: PostFull;
}

export default function RowPostListComponent({ post }: Props) {
  const mainImage = getMainImage(post);
  const src = mainImage
    ? `/images/post/${mainImage.filename}`
    : post.images[0]?.filename
      ? `/images/post/${post.images[0].filename}`
      : null;

  return (
    <ul className={s.postList}>
      <li className={s.postTitle}>{post.title}</li>
      <li className={s.postImage}>
        {src !== null && (
          <Image
            src={src}
            alt="image"
            height={50}
            width={50}
            style={{
              objectFit: "contain",
            }}
            unoptimized
          />
        )}
      </li>
      <li className={s.icon}>
        <AddUpdateButton item={post} action={updatePost} />
      </li>
      <li className={s.icon}>
        <DeleteButton action={() => deletePost(post.id)} />
      </li>
    </ul>
  );
}
