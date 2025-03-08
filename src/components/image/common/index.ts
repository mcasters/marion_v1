import { Photo } from "@/lib/type";

export const onPrev = (
  active: number,
  setActive: (arg0: number) => void,
  photos: Photo[],
): void => {
  if (active > 0) {
    setActive(active - 1);
  } else {
    setActive(photos.length - 1);
  }
};

export const onNext = (
  active: number,
  setActive: (arg0: number) => void,
  photos: Photo[],
): void => {
  if (active < photos.length - 1) {
    setActive(active + 1);
  } else {
    setActive(0);
  }
};
