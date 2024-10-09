"use client";

import { Photo } from "@/lib/db/item";
import Slider from "@/components/image/slideshow/Slider";

type Props = {
  photos: Photo[];
  autoPlay: boolean;
};

export default function Slideshow({ photos, autoPlay }: Props) {
  return (
    <div style={{ position: "relative" }}>
      <Slider photos={photos} autoPlay={autoPlay} />
    </div>
  );
}
