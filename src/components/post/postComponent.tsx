"use client";

import s from "./postComponent.module.css";
import React, { useMemo, useState } from "react";
import { PostFull } from "@/lib/type";
import { getPostPhotoTab } from "@/utils/imageUtils";
import { useMetas } from "@/app/context/metaProvider";
import useWindowSize from "@/components/hooks/useWindowSize";
import { DEVICE } from "@/constants/image";
import { META } from "@/constants/admin";
import Gallery from "@/components/image/gallery/gallery.tsx";
import FormattedImage from "@/components/image/formattedImage.tsx";
import Lightbox from "@/components/image/lightbox/lightbox.tsx";

interface Props {
  post: PostFull;
}
export default function PostComponent({ post }: Props) {
  const metas = useMetas();
  const window = useWindowSize();
  const isSmall = window.innerWidth < DEVICE.SMALL;
  const [index, setIndex] = useState(-1);
  const { mainPhotos, photos } = useMemo(
    () =>
      getPostPhotoTab(
        post,
        `Photo du post "${post.title}" de ${metas.get(META.SITE_TITLE)}`,
      ),
    [post],
  );

  return (
    <>
      <article className={s.postContainer}>
        {mainPhotos.sm.length > 0 && (
          <>
            <FormattedImage
              photo={isSmall ? mainPhotos.sm[0] : mainPhotos.md[0]}
              priority={true}
              onClick={() => setIndex(0)}
              maxWidth={isSmall ? 65 : 30}
              maxHeight={isSmall ? 35 : 50}
            />
            <Lightbox
              photos={[isSmall ? mainPhotos.md[0] : mainPhotos.lg[0]]}
              index={index}
              onClose={() => setIndex(-1)}
              isSmall={isSmall}
            />
          </>
        )}
        <div className={s.postInfo}>
          <h2>{post.title}</h2>
          <time>{new Date(post.date).getFullYear()}</time>
          <p>
            <br />
            {post.text}
          </p>
        </div>
        {photos.sm.length > 0 && <Gallery photos={photos} />}
      </article>
      <span>
        <strong>***</strong>
      </span>
    </>
  );
}
