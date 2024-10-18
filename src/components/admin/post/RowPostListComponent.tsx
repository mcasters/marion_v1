"use client";

import Image from "next/image";

import DeleteButton from "@/components/admin/form/DeleteButton";
import UpdateButton from "@/components/admin/form/UpdateButton";
import s from "../../../styles/admin/AdminList.module.css";
import { PostFull, Type } from "@/lib/db/item";
import { getMainImage } from "@/utils/commonUtils";

interface Props {
  post: PostFull;
}

export default function RowPostListComponent({ post }: Props) {
  const mainImage = getMainImage(post);
  const src = mainImage
    ? `/images/post/${mainImage?.filename}`
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
        <UpdateButton item={post} type={Type.POST} />
      </li>
      <li className={s.itemIcon}>
        <DeleteButton api={`api/post/delete/${post.id}`} />
      </li>
    </ul>
  );
}
