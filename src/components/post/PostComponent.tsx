"use client";

import Lightbox from "@/components/image/lightbox/Lightbox";
import s from "./PostComponent.module.css";
import Gallery from "@/components/image/gallery/Gallery";
import { useMemo } from "react";
import { PostFull } from "@/lib/type";
import { getPhotoTab } from "@/utils/imageUtils";
import { useMetas } from "@/app/context/metaProvider";
import { META } from "@/constants/specific";

interface Props {
  post: PostFull;
}
export default function PostComponent({ post }: Props) {
  const metas = useMetas();
  const { mainPhotos, photos } = useMemo(
    () =>
      getPhotoTab(
        post,
        `Photo du post "${post.title}" de ${metas[META.SITE_TITLE]}`,
      ),
    [post],
  );

  return (
    <>
      <article className={s.postContainer}>
        {mainPhotos.sm.length > 0 && (
          <Lightbox photos={mainPhotos} priority={true} />
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
      <div>***</div>
    </>
  );
}
