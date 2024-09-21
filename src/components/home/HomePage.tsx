"use client";

import Slideshow from "@/components/image/slideshow/Slideshow";
import { Image } from "@/lib/db/item";

export type Props = {
  sliderImages: Image[];
};

export default function HomePage({ sliderImages }: Props) {
  if (sliderImages.length > 0) return <Slideshow images={sliderImages} />;
}
