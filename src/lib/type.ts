/* eslint-disable  @typescript-eslint/no-explicit-any */
/* eslint-disable  @typescript-eslint/no-empty-object-type */

import { Prisma, User } from "../../prisma/generated/client";
import prisma from "@/lib/script.ts";

type StringKeys<T> = {
  [k in keyof T]: T[k] extends string ? k : never;
}[keyof T];
export type OnlyString<T> = { [k in StringKeys<T>]: boolean };

export enum Type {
  PAINTING = "peinture",
  SCULPTURE = "sculpture",
  POST = "post",
  DRAWING = "dessin",
  CATEGORY = "catégorie",
}

type PaintingFull = Prisma.Result<typeof prisma.painting, {}, any>; // With Image[] field
type DrawingFull = Prisma.Result<typeof prisma.drawing, {}, any>; // With Image[] field
type CategoryContent = Prisma.Result<typeof prisma.categoryContent, {}, any>; // With Image field
type SculptureFull = Prisma.Result<typeof prisma.sculpture, {}, any>; // No change - just to uniformise name
export type PostFull = Prisma.Result<typeof prisma.post, {}, any>; // No change - just to uniformise name

export type WorkFull = PaintingFull | SculptureFull | DrawingFull;

export type Category = {
  id: number;
  key: string;
  value: string;
  content: CategoryContent;
};

export type CategoryFull = Category & {
  type: Type.CATEGORY;
  workType: Type.PAINTING | Type.SCULPTURE | Type.DRAWING;
  images: Image[];
  count: number;
};

export type Item = WorkFull | PostFull | CategoryFull;

export type Message = {
  id: number;
  date: Date;
  text: string;
  author: User;
};

export enum ItemLayout {
  MONO,
  DOUBLE,
  MULTIPLE,
  SCULPTURE,
}

export enum ItemDarkBackground {
  FALSE,
  TRUE,
}

export enum HomeLayout {
  PLAIN,
  NAV,
}

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

export interface Photo {
  src: string;
  width: number;
  height: number;
  alt: string;
  title: string;
  date: Date;
  isMain: boolean;
}

export type PhotoTab = {
  sm: Photo[];
  md: Photo[];
  lg: Photo[];
};

export interface PhotoEnhanced extends Photo {
  item: WorkFull;
}

export type PhotoTabEnhanced = {
  sm: PhotoEnhanced[];
  md: PhotoEnhanced[];
  lg: PhotoEnhanced[];
};

export type Session = {
  user: User;
};

export type ThemeTarget = {
  background: string;
  text: string;
  link: string;
  linkHover: string;
};

export type ThemeGeneralTarget = {
  lineColor: string;
  titleColor: string;
  lightbox: string;
};

export type ThemePagePart = {
  menu1: ThemeTarget;
  menu2: ThemeTarget;
  main: ThemeTarget;
  footer: ThemeTarget;
};

export type StructuredTheme = {
  general: ThemeGeneralTarget;
  home: ThemePagePart;
  item: ThemePagePart;
  other: ThemePagePart;
};
