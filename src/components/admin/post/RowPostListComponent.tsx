"use client";

import Image from "next/image";
import UpdateItemButton from "@/components/admin/form/UpdateItemButton";
import s from "../../../styles/admin/AdminList.module.css";
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
    <ul className={s.item}>
      <li className={s.itemTitle}>
        <span className={s.name}>{post.title}</span>
      </li>
      <li className={s.itemImage}>
        {src !== null && (
          <Image
            src={src}
            alt="image"
            height={50}
            width={50}
            style={{
              objectFit: "contain",
            }}
          />
        )}
      </li>
      <li className={s.itemIcon}>
        <UpdateItemButton item={post} />
      </li>
      <li className={s.itemIcon}>
        <DeletePostButton id={post.id} />
      </li>
    </ul>
  );
}
