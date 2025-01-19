import { Label, PresetColor, Theme } from "@prisma/client";
import { THEME } from "@/constants/database";
import { OnlyString } from "@/lib/db/theme";
import {
  ContentFull,
  DrawingFull,
  Image,
  ImageSize,
  ItemFull,
  PaintingFull,
  PhotoTab,
  PostFull,
  SculptureFull,
  Type,
} from "@/lib/db/item";

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

export const getGalleryImages = (post: PostFull) => {
  return post?.images?.filter((i) => !i.isMain) || undefined;
};

export const isPaintingFull = (item: any): item is PaintingFull =>
  Object.values(item).includes(Type.PAINTING);

export const isDrawingFull = (item: any): item is DrawingFull =>
  Object.values(item).includes(Type.DRAWING);

export const isSculptureFull = (item: any): item is SculptureFull =>
  Object.values(item).includes(Type.SCULPTURE);

export const isPostFull = (item: any): item is PostFull =>
  Object.values(item).includes(Type.POST);

export const getBaseThemeData = () => {
  return {
    name: THEME.BASE_THEME,
    isActive: true,
    lineColor: "#be2d01",
    backgroundColor: "#fafafa",
    backgroundColorItem: "#fafafa",
    color: "#333",
    colorItem: "#333",
    titleColor: "#333",

    linkColor: "#be2d01",
    linkHoverColor: "#333",
    linkItemColor: "#be2d01",
    linkHoverItemColor: "#333",

    menu1Color: "#e7e7e7",
    menu1HomeColor: "#e7e7e7",
    menu1ItemColor: "#e7e7e7",
    menu1LinkColor: "#333",
    menu1LinkHoverColor: "#be2d01",
    menu1LinkHomeColor: "#333",
    menu1LinkHomeHoverColor: "#be2d01",
    menu1LinkItemColor: "#333",
    menu1LinkHoverItemColor: "#be2d01",

    menu2Color: "#fafafa",
    menu2HomeColor: "#fafafa",
    menu2ItemColor: "#fafafa",
    menu2LinkColor: "#be2d01",
    menu2LinkHoverColor: "#333",
    menu2LinkHomeColor: "#be2d01",
    menu2LinkHomeHoverColor: "#333",
    menu2LinkItemColor: "#be2d01",
    menu2LinkHoverItemColor: "#333",
  };
};

export const getBasePresetColorData = () => {
  return {
    name: "Red",
    color: "#be2d01",
  };
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

export const getImageTab = (
  item: SculptureFull | PaintingFull | DrawingFull,
): Image[] => {
  if (isSculptureFull(item)) {
    return item.images.map((i) => {
      return {
        id: i.id,
        filename: i.filename,
        width: i.width,
        height: i.height,
        isMain: i.isMain,
      };
    });
  }
  return [
    {
      id: 0,
      filename: item.imageFilename,
      width: item.imageWidth,
      height: item.imageHeight,
      isMain: false,
    },
  ];
};

const restForPhotoTab = (
  item: SculptureFull | PaintingFull | DrawingFull | PostFull,
) => {
  return {
    alt:
      item.type === Type.POST
        ? `${item.title} - photo d'un post de Thierry Casters`
        : `${item.title} - ${item.type} de Thierry Casters`,
    title: item.title,
    date: item.date,
  };
};

export const getPhotoTab = (
  item: SculptureFull | PaintingFull | DrawingFull | PostFull | ItemFull,
  splitMain: boolean = false,
): {
  mainPhotos: PhotoTab;
  photos: PhotoTab;
} => {
  const mainPhotos: PhotoTab = { sm: [], md: [], lg: [] };
  const photos: PhotoTab = { sm: [], md: [], lg: [] };

  if (isPaintingFull(item) || isDrawingFull(item)) {
    for (const [key, value] of Object.entries(ImageSize)) {
      photos[key as keyof PhotoTab].push({
        src: `/images/${item.type}${value.FOLDER}/${item.imageFilename}`,
        width: key === "lg" ? item.imageWidth : value.WIDTH,
        height:
          key === "lg"
            ? item.imageHeight
            : Math.round((value.WIDTH * item.imageHeight) / item.imageWidth),
        isMain: false,
        ...restForPhotoTab(item),
      });
    }
  } else if (isSculptureFull(item) || isPostFull(item)) {
    for (const [key, value] of Object.entries(ImageSize)) {
      for (const i of item.images) {
        const photo = {
          src: `/images/${item.type}${value.FOLDER}/${i.filename}`,
          width: key === "lg" ? i.width : value.WIDTH,
          height:
            key === "lg"
              ? i.height
              : Math.round((value.WIDTH * i.height) / i.width),
          isMain: i.isMain,
          ...restForPhotoTab(item),
        };

        if (splitMain && i.isMain)
          mainPhotos[key as keyof PhotoTab].push(photo);
        else photos[key as keyof PhotoTab].push(photo);
      }
    }
  }
  return { mainPhotos, photos };
};
