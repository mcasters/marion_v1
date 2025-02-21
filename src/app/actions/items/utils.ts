import { Category, ItemFull, Type } from "@/lib/type";
import {
  deleteFile,
  getItemDir,
  getSculptureDir,
  resizeAndSaveImage,
} from "@/utils/serverUtils";
import prisma from "@/lib/prisma";
import { transformValueToKey } from "@/utils/commonUtils";

export const getPaintOrDrawData = async (
  type: Type.PAINTING | Type.DRAWING,
  formData: FormData,
  oldItem: ItemFull | null,
) => {
  const rawFormData = Object.fromEntries(formData);
  const file = rawFormData.file as File;
  const title = rawFormData.title as string;
  const category = handleCategory(rawFormData.categoryId as string, oldItem);
  const fileInfo = await handlePaintOrDrawImages(type, file, title, oldItem);

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

export const getSculptData = async (
  formData: FormData,
  oldItem: ItemFull | null,
) => {
  const rawFormData = Object.fromEntries(formData);
  const files = formData.getAll("files") as File[];
  const title = rawFormData.title as string;
  const category = handleCategory(rawFormData.categoryId as string, oldItem);
  const images = await handleSculptImages(
    files,
    title,
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

const handlePaintOrDrawImages = async (
  type: Type.PAINTING | Type.DRAWING,
  file: File,
  title: string,
  oldItem: ItemFull | null,
) => {
  const dir = getItemDir(type);
  if (file.size > 0) {
    if (oldItem) deleteFile(getItemDir(type), oldItem.images[0].filename);
    return await resizeAndSaveImage(file, title, dir);
  } else return null;
};

const handleSculptImages = async (
  files: File[],
  title: string,
  filenamesToDelete: string,
) => {
  const dir = getSculptureDir();
  if (filenamesToDelete) {
    for await (const filename of filenamesToDelete.split(",")) {
      deleteFile(dir, filename);
      await prisma.sculptureImage.delete({
        where: { filename },
      });
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

export const handleCategory = (
  categoryId: string,
  oldItem: ItemFull | null,
) => {
  return categoryId !== "0"
    ? {
        connect: {
          id: Number(categoryId),
        },
      }
    : oldItem && oldItem.categoryId
      ? {
          disconnect: {
            id: Number(oldItem.categoryId),
          },
        }
      : {};
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
