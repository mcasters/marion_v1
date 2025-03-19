"use client";

import Image from "next/image";
import UpdateItemButton from "@/components/admin/form/item/UpdateItemButton";
import s from "../adminList.module.css";
import { PostFull } from "@/lib/type";
import { getMainImage } from "@/utils/commonUtils";
import DeletePostButton from "@/components/admin/form/DeletePostButton";

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
        <UpdateItemButton item={post} />
      </li>
      <li className={s.icon}>
        <DeletePostButton id={post.id} />
      </li>
    </ul>
  );
}
