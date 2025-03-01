import {
  ContentFull,
  Image,
  ItemFull,
  PhotoTab,
  PostFull,
  Type,
} from "@/lib/type";
import { IMAGE } from "@/constants/image";
import { Label } from "@prisma/client";
import { getSliders } from "@/utils/commonUtils";

const getEmptyPhotoTab = (): PhotoTab => {
  return { sm: [], md: [], lg: [] };
};

const getPhotosFromImages = (
  images: Image[],
  folder: string,
  splitMain: boolean,
  alt: string,
  title: string = "",
  date: Date = new Date(),
): {
  mainPhotos: PhotoTab;
  photos: PhotoTab;
} => {
  const mainPhotos = getEmptyPhotoTab();
  const photos = getEmptyPhotoTab();

  for (const image of images) {
    const isUnderSM = image.width < IMAGE.SM_PX;
    const isUnderMD = image.width < IMAGE.MD_PX;
    const photosSM = {
      src: `/images/${folder}/sm/${image.filename}`,
      width: isUnderSM ? image.width : IMAGE.SM_PX,
      height: isUnderSM
        ? image.height
        : (image.height * IMAGE.SM_PX) / image.width,
      isMain: image.isMain,
      title,
      date,
      alt,
    };
    const photosMD = {
      src: `/images/${folder}/md/${image.filename}`,
      width: isUnderMD ? image.width : IMAGE.MD_PX,
      height: isUnderMD
        ? image.height
        : (image.height * IMAGE.MD_PX) / image.width,
      isMain: image.isMain,
      title,
      date,
      alt,
    };
    const photosLG = {
      src: `/images/${folder}/${image.filename}`,
      width: image.width,
      height: image.height,
      isMain: image.isMain,
      title,
      date,
      alt,
    };

    if (splitMain && image.isMain) {
      mainPhotos.sm.push(photosSM);
      mainPhotos.md.push(photosMD);
      mainPhotos.lg.push(photosLG);
    } else {
      photos.sm.push(photosSM);
      photos.md.push(photosMD);
      photos.lg.push(photosLG);
    }
  }
  return { mainPhotos, photos };
};

export const getContentPhotoTab = (
  content: ContentFull | null,
  alt: string,
): {
  mainPhotos: PhotoTab;
  photos: PhotoTab;
} => {
  if (content) {
    return getPhotosFromImages(
      content.images,
      "miscellaneous",
      content.label === Label.SLIDER,
      alt,
    );
  }
  return { mainPhotos: getEmptyPhotoTab(), photos: getEmptyPhotoTab() };
};

export const getPhotoTab = (
  item: PostFull | ItemFull,
  alt: string,
): {
  mainPhotos: PhotoTab;
  photos: PhotoTab;
} => {
  const isPost = item.type === Type.POST;
  const folder =
    item.type === Type.PAINTING
      ? "peinture"
      : item.type === Type.SCULPTURE
        ? "sculpture"
        : isPost
          ? "post"
          : "dessin";
  return getPhotosFromImages(
    item.images,
    folder,
    isPost,
    alt,
    item.title,
    item.date,
  );
};

export const getSliderLandscapeImages = (contents: ContentFull[]): Image[] => {
  const images: Image[] = getSliders(contents);
  const tab: Image[] = [];
  images.forEach((i) => {
    if (!i.isMain) tab.push(i);
  });
  return tab;
};

export const getSliderPortraitImages = (contents: ContentFull[]): Image[] => {
  const images: Image[] = getSliders(contents);
  const tab: Image[] = [];
  images.forEach((i) => {
    if (i.isMain) tab.push(i);
  });
  return tab;
};
