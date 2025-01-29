"use client";

import Lightbox from "@/components/image/lightbox/Lightbox";
import s from "./PostComponent.module.css";
import Gallery from "@/components/image/Gallery";
import { useMemo } from "react";
import { getPhotoTab } from "@/utils/commonUtils";
import { PostFull } from "@/lib/model";

interface Props {
  post: PostFull;
}
export default function PostComponent({ post }: Props) {
  const { mainPhotos, photos } = useMemo(() => getPhotoTab(post, true), [post]);

  return (
    <>
      <article className={s.postContainer}>
        <div className={s.mainImage}>
          {mainPhotos.sm.length > 0 && (
            <Lightbox photos={mainPhotos} isCentered={true} />
          )}
        </div>
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
