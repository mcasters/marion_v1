"use client";

import Lightbox from "@/components/image/lightbox/Lightbox";
import s from "./PostComponent.module.css";
import Gallery from "@/components/image/Gallery";
import { useMemo } from "react";
import { PostFull } from "@/lib/type";
import { getPhotoTab } from "@/utils/imageUtils";

interface Props {
  post: PostFull;
}
export default function PostComponent({ post }: Props) {
  const { mainPhotos, photos } = useMemo(() => getPhotoTab(post), [post]);

  return (
    <>
      <article className={s.postContainer}>
        {mainPhotos.sm.length > 0 && (
          <Lightbox photos={mainPhotos} isCentered={true} />
        )}
        <div className={s.info}>
          <h2>{post.title}</h2>
          <time>{new Date(post.date).getFullYear()}</time>
          <p>
            <br />
            {post.text}
          </p>
        </div>
        {photos.sm.length > 0 && (
          <div className={s.gallery}>
            <Gallery photos={photos} />
          </div>
        )}
      </article>
      <div className="separate"></div>
    </>
  );
}
