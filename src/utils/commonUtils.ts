import { Label } from "@prisma/client";
import {
  Category,
  CategoryFull,
  ContentFull,
  HomeLayout,
  Image,
  ItemLayout,
  PostFull,
  Type,
  workFull,
} from "@/lib/type";
import { Meta } from ".prisma/client";
import { META } from "@/constants/admin";

export const transformValueToKey = (value: string): string =>
  value
    .toLowerCase()
    .split(" ")
    .join("_")
    .replace(/[`~!@#$%^&*()'”‘|+\-=?;:",.<>{}\[\]\\\/]/gi, "")
    .replace(/à/gi, "a")
    .replace(/é/gi, "e")
    .replace(/è/gi, "e")
    .replace(/ê/gi, "e")
    .replace(/ù/gi, "u")
    .replace(/ç/gi, "c")
    .replace(/î/gi, "i")
    .replace(/ë/gi, "e");

// @ts-expect-error: any return function
export const createNestedObject = (obj, key, ...keys) => {
  return key != undefined
    ? // @ts-expect-error: A spread argument must either have a tuple type or be passed to a rest parameter.
      createNestedObject(obj[key] || (obj[key] = {}), ...keys)
    : obj;
};

export const getPresentationContent = (
  contents: ContentFull[],
): ContentFull | null =>
  contents?.filter((c) => c.label === Label.PRESENTATION)[0] || null;

export const getSliderContent = (contents: ContentFull[]): ContentFull | null =>
  contents?.filter((c) => c.label === Label.SLIDER)[0] || null;

export const getPresentationText = (contents: ContentFull[]): string =>
  contents?.filter((c) => c.label === Label.PRESENTATION)[0]?.text || "";

export const getPresentationImage = (contents: ContentFull[]): Image[] =>
  contents?.filter((c) => c.label === Label.PRESENTATION)[0]?.images || [];

export const getDemarcheText = (contents: ContentFull[]): string =>
  contents?.filter((c) => c.label === Label.DEMARCHE)[0]?.text || "";

export const getInspirationText = (contents: ContentFull[]): string =>
  contents?.filter((c) => c.label === Label.INSPIRATION)[0]?.text || "";

export const getIntroText = (contents: ContentFull[]): string =>
  contents?.filter((c) => c.label === Label.INTRO)[0]?.text || "";

export const getSliders = (contents: ContentFull[]): Image[] | [] =>
  contents?.filter((c) => c.label === Label.SLIDER)[0]?.images || [];

export const getAddressText = (contents: ContentFull[]): string =>
  contents?.filter((c) => c.label === Label.ADDRESS)[0]?.text || "";

export const getPhoneText = (contents: ContentFull[]): string =>
  contents?.filter((c) => c.label === Label.PHONE)[0]?.text || "";

export const getEmailText = (contents: ContentFull[]): string =>
  contents?.filter((c) => c.label === Label.EMAIL)[0]?.text || "";

export const getContactText = (contents: ContentFull[]): string =>
  contents?.filter((c) => c.label === Label.TEXT_CONTACT)[0]?.text || "";

export const getMetaMap = (metas: Meta[]): Map<string, string> => {
  const map = new Map();
  metas.forEach((meta) => {
    map.set(meta.label, meta.text);
  });
  return map;
};

export const getMainImage = (post: PostFull) => {
  return post?.images?.filter((i) => i.isMain)[0] || undefined;
};

export const getEmptyItem = (
  type: Type.SCULPTURE | Type.DRAWING | Type.PAINTING,
): workFull => {
  return {
    id: 0,
    type,
    title: "",
    date: new Date(),
    technique: "",
    description: "",
    height: 0,
    width: 0,
    length: 0,
    isToSell: false,
    price: undefined,
    sold: false,
    images: [],
    categoryId: null,
  };
};

export const getEmptyPost = (): PostFull => {
  return {
    id: 0,
    type: Type.POST,
    title: "",
    date: new Date(),
    text: "",
    images: [],
  };
};

export const getEmptyImage = (): Image => {
  return {
    id: 0,
    filename: "",
    width: 0,
    height: 0,
    isMain: false,
  };
};

export const getEmptyContent = () => {
  return {
    id: 0,
    title: "",
    text: "",
    image: getEmptyImage(),
  };
};

export const getEmptyCategoryFull = (
  workType: Type.PAINTING | Type.DRAWING | Type.SCULPTURE,
): CategoryFull => {
  return {
    id: 0,
    key: "",
    value: "",
    type: Type.CATEGORY,
    count: 0,
    workType,
    content: getEmptyContent(),
    images: [getEmptyImage()],
  };
};

export const getNoCategory = (): Category => {
  return {
    id: 0,
    key: "no-category",
    value: "Sans catégorie",
    content: getEmptyContent(),
  };
};

export const getItemLayout = (
  metas: Map<string, string>,
  type: Type.PAINTING | Type.SCULPTURE | Type.DRAWING,
): ItemLayout => {
  switch (type) {
    case Type.PAINTING:
      return parseInt(metas.get(META.PAINTING_LAYOUT) || "1");
    case Type.SCULPTURE:
      return parseInt(metas.get(META.SCULPTURE_LAYOUT) || "3");
    case Type.DRAWING:
      return parseInt(metas.get(META.DRAWING_LAYOUT) || "1");
  }
};

export const getHomeLayout = (metas: Map<string, string>): HomeLayout => {
  return parseInt(metas.get(META.HOME_LAYOUT) || "0");
};

export const getCategoriesFull = (
  categories: Category[],
  items: workFull[],
): CategoryFull[] => {
  const map = new Map();
  categories.forEach((category) => {
    map.set(category.id, {
      ...category,
      type: "catégorie",
      workType: items[0].type,
      images: [],
      count: 0,
    });
  });
  items.forEach((item) => {
    const categoryMap =
      item.categoryId === null ? map.get(0) : map.get(item.categoryId);
    categoryMap.images.push(...item.images);
    categoryMap.count += 1;
  });
  return [...map.values()];
};
