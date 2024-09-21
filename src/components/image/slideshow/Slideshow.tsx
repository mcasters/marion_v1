"use client";

import Lightbox from "yet-another-react-lightbox";
import Inline from "yet-another-react-lightbox/plugins/inline";
import "yet-another-react-lightbox/styles.css";
import s from "@/components/image/slideshow/slideshow.module.css";
import Image from "next/image";
import { DEVICE } from "@/constants/image";
import { Image as IImage } from "@/lib/db/item";

type Props = {
  images: IImage[];
};

export default function Slideshow({ images }: Props) {
  const slides = images.map(({ filename, width, height }) => ({
    src: filename,
    width,
    height,
  }));

  return (
    <Lightbox
      slides={slides}
      render={{
        slide: ({ slide, rect }) => (
          <Image
            loader={({ src, width, quality }) => {
              const directory = width <= DEVICE.SMALL ? "md/" : "";
              return `/images/miscellaneous/${directory}${src}`;
            }}
            width={rect.width}
            height={rect.height}
            alt="Œuvre de Marion Casters"
            src={slide.src}
            loading="eager"
            draggable={false}
            sizes={"100vw"}
            className={s.image}
          />
        ),
      }}
      plugins={[Inline]}
      inline={{
        style: {
          width: "100%",
          maxWidth: "2000px",
          height: "140vh",
          margin: "0 auto",
        },
      }}
      carousel={{
        spacing: 0,
        padding: 0,
      }}
    />
  );
}
