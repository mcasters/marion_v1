"use client";

import { Photo } from "@/lib/type";
import Slider from "@/components/image/slideshow/Slider";

type Props = {
  photos: Photo[];
  autoPlay: boolean;
};

export default function Slideshow({ photos, autoPlay }: Props) {
  return (
    photos.length > 0 && (
      <div style={{ position: "relative" }}>
        <Slider photos={photos} autoPlay={autoPlay} />
      </div>
    )
  );
}
