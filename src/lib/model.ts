import { User } from ".prisma/client";

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
  category: Category | undefined;
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
}

export type Category = {
  id: number;
  key: string;
  value: string;
};

export type CategoryFull = {
  id: number;
  key: string;
  value: string;
  count: number;
};

export type Session = {
  user: User;
};
