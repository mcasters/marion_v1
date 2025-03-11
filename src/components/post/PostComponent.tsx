"use client";

import s from "./PostComponent.module.css";
import Gallery from "@/components/image/gallery/Gallery";
import React, { useMemo, useState } from "react";
import { PostFull } from "@/lib/type";
import { getPostPhotoTab } from "@/utils/imageUtils";
import { useMetas } from "@/app/context/metaProvider";
import { META } from "@/constants/specific";
import Image from "next/image";
import { createPortal } from "react-dom";
import Lightbox from "@/components/image/lightbox/Lightbox";
import useWindowSize from "@/components/hooks/useWindowSize";
import { DEVICE } from "@/constants/image";

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

  const mainPhotoForButton = isSmall ? mainPhotos.sm[0] : mainPhotos.md[0];
  const mainPhotoForLightbox = isSmall ? mainPhotos.md[0] : mainPhotos.lg[0];

  return (
    <>
      <article className={s.postContainer}>
        {mainPhotoForButton && (
          <>
            <Image
              src={mainPhotoForButton.src}
              width={mainPhotoForButton.width}
              height={mainPhotoForButton.height}
              priority={true}
              style={{ objectFit: "contain" }}
              alt={mainPhotoForButton.alt}
              unoptimized
              onClick={() => {
                setIndex(0);
              }}
              title="Agrandir"
              className={s.mainPhoto}
            />

            {index >= 0 &&
              createPortal(
                <Lightbox
                  photos={[mainPhotoForLightbox]}
                  index={index}
                  onClose={() => setIndex(-1)}
                  isSmall={isSmall}
                />,
                document.body,
              )}
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
        {photos.sm.length > 0 && (
          <div className={s.gallery}>
            <Gallery photos={photos} />
          </div>
        )}
      </article>
      <span>
        <strong>***</strong>
      </span>
    </>
  );
}
