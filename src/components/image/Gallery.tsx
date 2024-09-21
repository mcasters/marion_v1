"use client";

import { useState } from "react";
import { RowsPhotoAlbum } from "react-photo-album";
import "react-photo-album/rows.css";
import Lightbox from "yet-another-react-lightbox";
import { DEVICE, IMAGE_SIZE } from "@/constants/image";
import { Image } from "@/lib/db/item";

interface Props {
  images: Image[];
  title: string;
  alt: string;
}

export default function Gallery({ images, title, alt }: Props) {
  const [index, setIndex] = useState(-1);

  const photos = images.map((image) => {
    const width = image.width;
    const height = image.height;
    return {
      src: `/images/post/${image.filename}`,
      width,
      height,
      alt,
      title,
      srcSet: [
        {
          src: `/images/post/sm/${image.filename}`,
          width: IMAGE_SIZE.SM_PX,
          height: Math.round((height / width) * IMAGE_SIZE.SM_PX),
        },
        {
          src: `/images/post/md/${image.filename}`,
          width: IMAGE_SIZE.MD_PX,
          height: Math.round((height / width) * IMAGE_SIZE.MD_PX),
        },
        {
          src: `/images/post/${image.filename}`,
          width: width,
          height: height,
        },
      ],
    };
  });
  return (
    <>
      <RowsPhotoAlbum
        photos={photos}
        onClick={({ index: current }) => setIndex(current)}
        breakpoints={[DEVICE.SMALL, DEVICE.MEDIUM]}
        componentsProps={() => ({
          button: {
            "aria-label": "Agrandir",
          },
        })}
      />
      <Lightbox
        index={index}
        slides={photos}
        open={index >= 0}
        close={() => setIndex(-1)}
        controller={{
          closeOnPullUp: true,
          closeOnPullDown: true,
          closeOnBackdropClick: true,
        }}
        styles={{
          slide: { padding: "1rem" },
        }}
      />
    </>
  );
}
