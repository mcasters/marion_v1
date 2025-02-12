import { User } from ".prisma/client";
import { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";

type StringKeys<T> = {
  [k in keyof T]: T[k] extends string ? k : never;
}[keyof T];

export type OnlyString<T> = { [k in StringKeys<T>]: boolean };

export type PaintingsFull = Prisma.Result<
  (typeof prisma.painting)[],
  "findMany"
>;
export type DrawingsFull = Prisma.Result<(typeof prisma.drawing)[], "findMany">;
export type SculpturesFull = Prisma.Result<
  (typeof prisma.sculpture)[],
  "findMany"
>;
export type PaintingCategoriesFull = Prisma.Result<
  (typeof prisma.paintingCategory)[],
  "findMany"
>;
export type DrawingCategoriesFull = Prisma.Result<
  (typeof prisma.drawingCategory)[],
  "findMany"
>;
export type SculptureCategoriesFull = Prisma.Result<
  (typeof prisma.sculptureCategory)[],
  "findMany"
>;

export type ItemFull = {
  id: number;
  type: Type.SCULPTURE | Type.PAINTING | Type.DRAWING;
  title: string;
  date: Date;
  technique: string;
  description: string;
  height: number;
  width: number;
  length: number;
  isToSell: boolean;
  price: number | undefined;
  sold: boolean;
  images: Image[];
  categoryId: number | null;
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
}

export type CategoryFull = {
  id: number;
  key: string;
  value: string;
  count: number;
  content: {
    title: string;
    text: string;
    image: Image;
  };
  items: ItemFull[];
};

export type Session = {
  user: User;
};
