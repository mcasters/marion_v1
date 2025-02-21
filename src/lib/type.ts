import { User } from ".prisma/client";
import { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";

type StringKeys<T> = {
  [k in keyof T]: T[k] extends string ? k : never;
}[keyof T];

export type OnlyString<T> = { [k in StringKeys<T>]: boolean };

export type PaintingFull = Prisma.Result<typeof prisma.painting, {}, any>;
export type SculptureFull = Prisma.Result<typeof prisma.sculpture, {}, any>;
export type DrawingFull = Prisma.Result<typeof prisma.drawing, {}, any>;
export type CategoryContent = Prisma.Result<
  typeof prisma.categoryContent,
  {},
  any
>;

export type PaintingCategoryFull = Prisma.PaintingCategoryGetPayload<{
  include: { content: true };
}>;
export type SculptureCategoryFull = Prisma.SculptureCategoryGetPayload<{
  include: { content: true };
}>;
export type DrawingCategoryFull = Prisma.DrawingCategoryGetPayload<{
  include: { content: true };
}>;

export type ItemFull = PaintingFull | SculptureFull | DrawingFull;

export type Category = {
  id: number;
  key: string;
  value: string;
  content: CategoryContent;
};

export enum Type {
  PAINTING = "peinture",
  SCULPTURE = "sculpture",
  POST = "post",
  DRAWING = "dessin",
}

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

export type Session = {
  user: User;
};
