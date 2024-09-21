"use client";

import Lightbox from "@/components/image/Lightbox";
import s from "./PostComponent.module.css";
import Gallery from "@/components/image/Gallery";
import { TYPE } from "@/constants";
import { useMemo } from "react";
import { getGalleryImages, getMainImage } from "@/utils/commonUtils";
import { PostFull } from "@/lib/db/item";

interface Props {
  post: PostFull;
}
export default function PostComponent({ post }: Props) {
  const mainImage = useMemo(() => getMainImage(post), [post]);
  const galleryImages = useMemo(() => getGalleryImages(post), [post]);

  return (
    <>
      <article className={s.postContainer}>
        <div className={s.mainImage}>
          {mainImage && (
            <Lightbox
              images={[mainImage]}
              alt={`${post.title} - Photo d'un post de Marion Casters`}
              type={TYPE.POST}
              isCentered={true}
            />
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
        {galleryImages && (
          <div className={s.gallery}>
            <Gallery
              images={galleryImages}
              title={`${post.title}`}
              alt={`${post.title} - Photo d'un post de Marion Casters`}
            />
          </div>
        )}
      </article>
      <div className="separate"></div>
    </>
  );
}
