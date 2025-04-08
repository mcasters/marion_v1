import { Type } from "@/lib/type";
import prisma from "@/lib/prisma";
import { addImages, deleteImages } from "@/app/actions/actionUtils";

export const getItemModel = (type: Type) => {
  switch (type) {
    case Type.PAINTING:
      return prisma.painting;
    case Type.SCULPTURE:
      return prisma.sculpture;
    case Type.DRAWING:
      return prisma.drawing;
    case Type.POST:
      return prisma.post;
  }
};

export const getData = async (type: Type, formData: FormData) => {
  const rawFormData = Object.fromEntries(formData);
  const isSculpture = type === Type.SCULPTURE;

  await deleteImages(rawFormData.filenamesToDelete as string, type);
  const newImages = await addImages(formData, type);

  return {
    title: rawFormData.title as string,
    date: new Date(Number(rawFormData.date), 1),
    technique: rawFormData.technique as string,
    description: rawFormData.description as string,
    height: Number(rawFormData.height),
    width: Number(rawFormData.width),
    length: isSculpture ? Number(rawFormData.length) : undefined,
    isToSell: rawFormData.isToSell === "on",
    price: Number(rawFormData.price),
    category: getCategory(formData),
    imageFilename:
      !isSculpture && newImages ? newImages[0].filename : undefined,
    imageWidth: !isSculpture && newImages ? newImages[0].width : undefined,
    imageHeight: !isSculpture && newImages ? newImages[0].height : undefined,
    images:
      isSculpture && newImages
        ? {
            create: newImages,
          }
        : undefined,
  };
};

const getCategory = (formData: FormData) => {
  const id = Number(formData.get("categoryId"));
  const oldId = Number(formData.get("oldCategoryId"));

  return id !== 0
    ? {
        connect: {
          id: id,
        },
      }
    : oldId
      ? {
          disconnect: {
            id: oldId,
          },
        }
      : {};
};
