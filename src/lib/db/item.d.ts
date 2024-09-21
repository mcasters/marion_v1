export type SculptureFull = {
  id: number;
  type: string;
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
  type: string;
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
  type: string;
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
  type: string;
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
  imageFilename: string;
  imageWidth: number;
  imageHeight: number;
  images: Image[];
  category: Category | null;
};

export type PostFull = {
  id: number;
  type: string;
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
