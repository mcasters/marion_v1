import { Category, Type } from "@/lib/type";
import { transformValueToKey } from "@/utils/commonUtils";
import prisma from "@/lib/prisma";

export const getCategoryModel = (type: Type) => {
  switch (type) {
    case Type.PAINTING:
      return prisma.paintingCategory;
    case Type.SCULPTURE:
      return prisma.sculptureCategory;
    case Type.DRAWING:
      return prisma.drawingCategory;
  }
};

export const getCategoryData = (
  formData: FormData,
  oldCategory: Category | null,
) => {
  const rawFormData = Object.fromEntries(formData);
  const value = rawFormData.value as string;
  const contentData = {
    title: rawFormData.title as string,
    text: rawFormData.text as string,
    imageFilename: rawFormData.filename as string,
    imageWidth: Number(rawFormData.width),
    imageHeight: Number(rawFormData.height),
  };

  const content =
    !oldCategory || !oldCategory.content
      ? {
          create: contentData,
        }
      : {
          update: contentData,
        };

  return {
    key: transformValueToKey(value),
    value,
    content,
  };
};
