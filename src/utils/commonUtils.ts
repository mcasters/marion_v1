import { Label, PresetColor, Theme } from "@prisma/client";
import { OnlyString } from "@/lib/db/theme";
import {
  ContentFull,
  Image,
  ItemFull,
  PhotoTab,
  PostFull,
  Type,
} from "@/lib/db/item";

import { BASE_PRESET_COLOR, BASE_THEME, TEXTS } from "@/constants/specific";

export const transformValueToKey = (value: string): string => {
  return value
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
};

export const getPresentationContent = (
  contents: ContentFull[],
): ContentFull | null => {
  return contents?.filter((c) => c.label === Label.PRESENTATION)[0] || null;
};

export const getPresentationText = (contents: ContentFull[]): string => {
  return contents?.filter((c) => c.label === Label.PRESENTATION)[0]?.text || "";
};

export const getPresentationImage = (contents: ContentFull[]): Image[] => {
  return (
    contents?.filter((c) => c.label === Label.PRESENTATION)[0]?.images || []
  );
};

export const getDemarcheText = (contents: ContentFull[]): string => {
  return contents?.filter((c) => c.label === Label.DEMARCHE)[0]?.text || "";
};

export const getInspirationText = (contents: ContentFull[]): string => {
  return contents?.filter((c) => c.label === Label.INSPIRATION)[0]?.text || "";
};

export const getIntroText = (contents: ContentFull[]): string => {
  return contents?.filter((c) => c.label === Label.INTRO)[0]?.text || "";
};

export const getSliders = (contents: ContentFull[]): Image[] | [] => {
  return contents?.filter((c) => c.label === Label.SLIDER)[0]?.images || [];
};

export const getSlidersLandscapeAndPortait = (
  contents: ContentFull[],
): { portraitImages: Image[]; landscapeImages: Image[] } => {
  const images: Image[] = getSliders(contents);
  const portraitImages: Image[] = [];
  const landscapeImages: Image[] = [];
  images.forEach((i) => {
    if (i.isMain) portraitImages.push(i);
    if (!i.isMain) landscapeImages.push(i);
  });
  return { portraitImages, landscapeImages };
};

export const getAddressText = (contents: ContentFull[]): string => {
  return contents?.filter((c) => c.label === Label.ADDRESS)[0]?.text || "";
};

export const getPhoneText = (contents: ContentFull[]): string => {
  return contents?.filter((c) => c.label === Label.PHONE)[0]?.text || "";
};

export const getEmailText = (contents: ContentFull[]): string => {
  return contents?.filter((c) => c.label === Label.EMAIL)[0]?.text || "";
};

export const getContactText = (contents: ContentFull[]): string => {
  return contents?.filter((c) => c.label === Label.TEXT_CONTACT)[0]?.text || "";
};

export const getMainImage = (post: PostFull) => {
  return post?.images?.filter((i) => i.isMain)[0] || undefined;
};

export const getBaseThemeData = () => {
  return BASE_THEME;
};

export const getBasePresetColorData = () => {
  return BASE_PRESET_COLOR;
};

export const themeToHexa = (
  theme: Theme,
  presetColors: PresetColor[],
): Theme => {
  const updatedTheme = theme;
  Object.entries(theme).forEach(([key, value]) => {
    if (typeof value === "string" && value.charAt(0) !== "#") {
      presetColors.find((p) => {
        if (p.name === value) {
          updatedTheme[key as keyof OnlyString<Theme>] = p.color;
        }
      });
    }
  });
  return updatedTheme;
};

export const colorNameToHex = (
  colorName: string,
  presetColors: PresetColor[],
): string => {
  let colorHex = colorName;
  if (colorName.charAt(0) !== "#") {
    presetColors.find((p) => {
      if (p.name === colorName) {
        colorHex = p.color;
      }
    });
  }
  return colorHex;
};

export function hexToRgb(
  hex: string,
): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
} // hexToRgb("#0033ff").g; // "51";

function componentToHex(c: number): string {
  const hex = c.toString(16);
  return hex.length === 1 ? "0" + hex : hex;
}

export function rgbToHex(r: number, g: number, b: number): string {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
} // rgbToHex(0, 51, 255); // #0033ff

const restForPhotoTab = (item: ItemFull | PostFull) => {
  return {
    alt:
      item.type === Type.POST
        ? `${item.title} - photo d'un post de ${TEXTS.TITLE}`
        : `${item.title} - ${item.type} de ${TEXTS.TITLE}`,
    title: item.title,
    date: item.date,
  };
};

export const getPhotoTab = (
  item: PostFull | ItemFull,
  splitMain: boolean = false,
): {
  mainPhotos: PhotoTab;
  photos: PhotoTab;
} => {
  const mainPhotos: PhotoTab = { sm: [], md: [], lg: [] };
  const photos: PhotoTab = { sm: [], md: [], lg: [] };

  for (const image of item.images) {
    const photosSM = {
      src: `/images/${item.type}/sm/${image.filename}`,
      width: image.width < 384 ? image.width : 384,
      height:
        image.width < 384 ? image.height : (image.height * 384) / image.width,
      isMain: image.isMain,
      ...restForPhotoTab(item),
    };
    const photosMD = {
      src: `/images/${item.type}/md/${image.filename}`,
      width: image.width < 640 ? image.width : 640,
      height:
        image.width < 640 ? image.height : (image.height * 640) / image.width,
      isMain: image.isMain,
      ...restForPhotoTab(item),
    };
    const photosLG = {
      src: `/images/${item.type}/${image.filename}`,
      width: image.width,
      height: image.height,
      isMain: image.isMain,
      ...restForPhotoTab(item),
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

export const getEmptyItem = (
  type: Type.SCULPTURE | Type.DRAWING | Type.PAINTING,
): ItemFull => {
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
    category: undefined,
  };
};
