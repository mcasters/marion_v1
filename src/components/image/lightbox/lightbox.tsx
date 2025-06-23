"use client";

import { Lightbox as YetLightbox } from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/styles.css";
import { Photo, PhotoEnhanced } from "@/lib/type";
import { LightboxSlide } from "@/components/image/lightbox/lightboxSlide";
import ImageInfos from "@/components/image/common/imageInfos";
import LimitedImageInfos from "@/components/image/common/limitedImageInfos";
import s from "./lightbox.module.css";

type Props = {
  photos: Photo[] | PhotoEnhanced[];
  index: number;
  onClose: () => void;
  isSmall: boolean;
};

export default function Lightbox({ photos, index, onClose, isSmall }: Props) {
  return (
    <YetLightbox
      index={index}
      open={index >= 0}
      close={onClose}
      slides={photos}
      render={{
        slide: LightboxSlide,
        buttonPrev: isSmall || photos.length <= 1 ? () => null : undefined,
        buttonNext: isSmall || photos.length <= 1 ? () => null : undefined,
        slideContainer: ({ slide, children }) => (
          <>
            {children}
            <div className={s.imageInfos}>
              {"item" in slide ? (
                <ImageInfos item={slide.item} isLightbox={true} />
              ) : (
                <LimitedImageInfos photo={slide as Photo} />
              )}
            </div>
          </>
        ),
      }}
      plugins={[Zoom]}
      zoom={{
        scrollToZoom: true,
      }}
    />
  );
}
