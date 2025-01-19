import { User } from ".prisma/client";

export type SculptureFull = {
  id: number;
  type: Type.SCULPTURE;
  title: string;
  date: Date;
  technique: string;
  description: string | null;
  height: number;
  width: number;
  length: number;
  isToSell: boolean;
  price: number | null;
  sold: boolean;
  images: Image[];
  category: Category | null;
};

export type PaintingFull = {
  id: number;
  type: Type.PAINTING;
  title: string;
  date: Date;
  technique: string;
  description: string | null;
  height: number;
  width: number;
  isToSell: boolean;
  price: number | null;
  sold: boolean;
  imageFilename: string;
  imageWidth: number;
  imageHeight: number;
  category: Category | null;
};

export type DrawingFull = {
  id: number;
  type: Type.DRAWING;
  title: string;
  date: Date;
  technique: string;
  description: string | null;
  height: number;
  width: number;
  isToSell: boolean;
  price: number | null;
  sold: boolean;
  imageFilename: string;
  imageWidth: number;
  imageHeight: number;
  category: Category | null;
};

export type ItemFull = {
  id: number;
  type: Type.PAINTING | Type.SCULPTURE | Type.DRAWING;
  title: string;
  date: Date;
  technique: string;
  description: string | null;
  height: number;
  width: number;
  length?: number;
  isToSell: boolean;
  price: number | null;
  sold: boolean;
  imageFilename?: string;
  imageWidth?: number;
  imageHeight?: number;
  images?: Image[];
  category: Category | null;
};

export type PostFull = {
  id: number;
  type: Type.POST;
  title: string;
  date: Date;
  text: string;
  images: Image[];
};

export type ContentFull = {
  id: number;
  label: string;
  title: string | null;
  text: string;
  images: Image[];
};

export type Image = {
  id: number;
  filename: string;
  width: number;
  height: number;
  isMain: boolean;
};

export type Photo = {
  src: string;
  width: number;
  height: number;
  alt: string;
  title: string;
  date: Date;
  isMain: boolean;
};

export type PhotoTab = {
  sm: Photo[];
  md: Photo[];
  lg: Photo[];
};

export enum Type {
  PAINTING = "peinture",
  SCULPTURE = "sculpture",
  POST = "post",
  DRAWING = "dessin",
  CATEGORY = "categorie",
}

export const ImageSize = {
  sm: { WIDTH: 384, FOLDER: "/sm" },
  md: { WIDTH: 640, FOLDER: "/md" },
  lg: { WIDTH: 2000, FOLDER: "" },
} as const;

export type Category = {
  id: number;
  type: Type.CATEGORY;
  key: string;
  value: string;
};

export type CategoryFull = {
  id: number;
  type: Type.CATEGORY;
  key: string;
  value: string;
  count: number;
};

export type Session = {
  user: User;
};
