import {
  ContentFull,
  Image,
  ItemFull,
  PhotoTab,
  PhotoTabEnhanced,
  PostFull,
  Type,
} from "@/lib/type";
import { IMAGE } from "@/constants/image";
import { getSliders } from "@/utils/commonUtils";

const getEmptyPhotoTab = (): PhotoTab => {
  return { sm: [], md: [], lg: [] };
};

const getEmptyPhotoTabEnhanced = (): PhotoTabEnhanced => {
  return { sm: [], md: [], lg: [] };
};

const getSplitMainPhotosFromImages = (
  images: Image[],
  folder: string,
  alt: string,
  title: string = "",
  date: Date = new Date(),
): { mainPhotos: PhotoTab; photos: PhotoTab } => {
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

    if (image.isMain) {
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

const getPhotosFromImages = (
  images: Image[],
  folder: string,
  alt: string,
  title: string = "",
  date: Date = new Date(),
): PhotoTab => {
  const photos = getEmptyPhotoTab();

  for (const image of images) {
    const isUnderSM = image.width < IMAGE.SM_PX;
    const isUnderMD = image.width < IMAGE.MD_PX;
    photos.sm.push({
      src: `/images/${folder}/sm/${image.filename}`,
      width: isUnderSM ? image.width : IMAGE.SM_PX,
      height: isUnderSM
        ? image.height
        : (image.height * IMAGE.SM_PX) / image.width,
      isMain: image.isMain,
      title,
      date,
      alt,
    });
    photos.md.push({
      src: `/images/${folder}/md/${image.filename}`,
      width: isUnderMD ? image.width : IMAGE.MD_PX,
      height: isUnderMD
        ? image.height
        : (image.height * IMAGE.MD_PX) / image.width,
      isMain: image.isMain,
      title,
      date,
      alt,
    });
    photos.lg.push({
      src: `/images/${folder}/${image.filename}`,
      width: image.width,
      height: image.height,
      isMain: image.isMain,
      title,
      date,
      alt,
    });
  }
  return photos;
};

const getPhotosEnhancedFromImages = (
  item: ItemFull,
  alt: string,
  photos: PhotoTabEnhanced,
): PhotoTabEnhanced => {
  const folder =
    item.type === Type.PAINTING
      ? "peinture"
      : item.type === Type.SCULPTURE
        ? "sculpture"
        : "dessin";

  for (const image of item.images) {
    const isUnderSM = image.width < IMAGE.SM_PX;
    const isUnderMD = image.width < IMAGE.MD_PX;
    photos.sm.push({
      src: `/images/${folder}/sm/${image.filename}`,
      width: isUnderSM ? image.width : IMAGE.SM_PX,
      height: isUnderSM
        ? image.height
        : (image.height * IMAGE.SM_PX) / image.width,
      alt,
      item,
    });
    photos.md.push({
      src: `/images/${folder}/md/${image.filename}`,
      width: isUnderMD ? image.width : IMAGE.MD_PX,
      height: isUnderMD
        ? image.height
        : (image.height * IMAGE.MD_PX) / image.width,
      alt,
      item,
    });
    photos.lg.push({
      src: `/images/${folder}/${image.filename}`,
      width: image.width,
      height: image.height,
      alt,
      item,
    });
  }
  return photos;
};

export const getSliderPhotoTab = (
  content: ContentFull | null,
  alt: string,
): { mainPhotos: PhotoTab; photos: PhotoTab } => {
  if (content) {
    return getSplitMainPhotosFromImages(content.images, "miscellaneous", alt);
  }
  return { mainPhotos: getEmptyPhotoTab(), photos: getEmptyPhotoTab() };
};

export const getContentPhotoTab = (
  content: ContentFull | null,
  alt: string,
): PhotoTab => {
  if (content) {
    return getPhotosFromImages(content.images, "miscellaneous", alt);
  }
  return getEmptyPhotoTab();
};

export const getPostPhotoTab = (
  post: PostFull,
  alt: string,
): { mainPhotos: PhotoTab; photos: PhotoTab } => {
  const folder = "post";
  return getSplitMainPhotosFromImages(
    post.images,
    folder,
    alt,
    post.title,
    post.date,
  );
};

export const getItemPhotoTab = (item: ItemFull, alt: string): PhotoTab => {
  const folder =
    item.type === Type.PAINTING
      ? "peinture"
      : item.type === Type.SCULPTURE
        ? "sculpture"
        : "dessin";
  return getPhotosFromImages(item.images, folder, alt, item.title, item.date);
};

export const getItemPhotoTabEnhanced = (
  items: ItemFull[],
  alt: string,
): PhotoTabEnhanced => {
  let photosEnhanced = getEmptyPhotoTabEnhanced();
  items.forEach((item) => {
    photosEnhanced = getPhotosEnhancedFromImages(item, alt, photosEnhanced);
  });
  return photosEnhanced;
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
