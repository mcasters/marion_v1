import { ItemFull, Type } from "@/lib/type";
import {
  deleteFile,
  getItemDir,
  getSculptureDir,
  resizeAndSaveImage,
} from "@/utils/serverUtils";
import prisma from "@/lib/prisma";

export const getItemData = (
  type: string,
  formData: FormData,
  oldItem: ItemFull | null,
) => {
  if (type === Type.PAINTING || type === Type.DRAWING)
    return getPaintOrDrawData(type, formData, oldItem);
  if (type === Type.SCULPTURE) return getSculptData(formData, oldItem);
};

const getPaintOrDrawData = async (
  type: string,
  formData: FormData,
  oldItem: ItemFull | null,
) => {
  const rawFormData = Object.fromEntries(formData);
  const file = rawFormData.file as File;
  const title = rawFormData.title as string;
  const category = getCategoryData(rawFormData.categoryId as string, oldItem);
  const fileInfo = await resizeAndSaveImage(file, title, getItemDir(type));

  return {
    title,
    date: new Date(Number(rawFormData.date), 1),
    technique: rawFormData.technique as string,
    description: rawFormData.description as string,
    height: Number(rawFormData.height),
    width: Number(rawFormData.width),
    isToSell: rawFormData.isToSell === "true",
    price: Number(rawFormData.price),
    imageFilename: fileInfo ? fileInfo.filename : undefined,
    imageWidth: fileInfo ? fileInfo.width : undefined,
    imageHeight: fileInfo ? fileInfo.height : undefined,
    category,
  };
};

const getSculptData = async (formData: FormData, oldItem: ItemFull | null) => {
  const rawFormData = Object.fromEntries(formData);
  const files = formData.getAll("files") as File[];
  const title = rawFormData.title as string;
  const category = getCategoryData(rawFormData.categoryId as string, oldItem);
  const images = await handleSculptImages(
    files,
    title,
    getSculptureDir(),
    rawFormData.filenamesToDelete as string,
  );

  return {
    title,
    date: new Date(Number(rawFormData.date), 1),
    technique: rawFormData.technique as string,
    description: rawFormData.description as string,
    height: Number(rawFormData.height),
    width: Number(rawFormData.width),
    length: Number(rawFormData.length),
    isToSell: rawFormData.isToSell === "true",
    price: Number(rawFormData.price),
    category,
    images: {
      create: images,
    },
  };
};

const handleSculptImages = async (
  files: File[],
  title: string,
  dir: string,
  filenamesToDelete: string,
) => {
  if (filenamesToDelete !== "") {
    for await (const filename of filenamesToDelete.split(",")) {
      if (deleteFile(dir, filename)) {
        await prisma.sculptureImage.delete({
          where: { filename },
        });
      }
    }
  }

  let images = [];
  for (const file of files) {
    if (file.size > 0) {
      const fileInfo = await resizeAndSaveImage(file, title, dir);
      if (fileInfo)
        images.push({
          filename: fileInfo.filename,
          width: fileInfo.width,
          height: fileInfo.height,
        });
    }
  }
  return images;
};

export const getCategoryData = (
  categoryId: string,
  oldItem: ItemFull | null,
) => {
  return categoryId !== ""
    ? {
        connect: {
          id: Number(categoryId),
        },
      }
    : oldItem && oldItem.categoryId
      ? {
          disconnect: {
            id: oldItem.categoryId,
          },
        }
      : {};
};
