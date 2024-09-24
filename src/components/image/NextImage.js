"use client";

import Image from "next/image";
import { useLightboxProps, useLightboxState } from "yet-another-react-lightbox";

export default function NextJsImage({ slide, offset, rect }) {
  const {
    on: { click },
    carousel: { imageFit },
  } = useLightboxProps();

  const { currentIndex } = useLightboxState();

  const width = Math.round(
    Math.min(rect.width, (rect.height / slide.height) * slide.width),
  );
  const height = Math.round(
    Math.min(rect.height, (rect.width / slide.width) * slide.height),
  );

  return (
    <div style={{ position: "relative", width, height }}>
      <Image
        fill
        alt=""
        src={slide}
        loading="eager"
        draggable={false}
        style={{
          objectFit: "contain",
        }}
        unoptimized
      />
    </div>
  );
}
