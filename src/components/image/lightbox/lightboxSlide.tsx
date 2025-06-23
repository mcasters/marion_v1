import Image from "next/image";
import React from "react";

export function LightboxSlide({ slide, offset, rect }) {
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
        alt={slide.alt}
        src={slide}
        loading="eager"
        style={{
          objectFit: "contain",
          paddingBottom: "30px",
        }}
        unoptimized
        draggable={false}
      />
    </div>
  );
}
