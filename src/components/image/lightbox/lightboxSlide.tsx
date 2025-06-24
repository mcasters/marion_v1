import Image from "next/image";
import type { ContainerRect, Slide } from "yet-another-react-lightbox";

export function LightboxSlide({
  slide,
  rect,
}: {
  slide: Slide;
  rect: ContainerRect;
}) {
  if (slide.height != undefined && slide.width != undefined) {
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
          alt={slide.alt || ""}
          src={slide.src}
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
  return undefined;
}
