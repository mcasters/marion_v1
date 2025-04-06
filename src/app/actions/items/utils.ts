import { ItemFull, Type } from "@/lib/type";
import { deleteFile, getDir, resizeAndSaveImage } from "@/utils/serverUtils";
import prisma from "@/lib/prisma";

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

export const getData = async (
  type: Type,
  formData: FormData,
  oldItem: ItemFull | null,
) => {
  const rawFormData = Object.fromEntries(formData);
  const filesToAdd = getFilesTab(formData, type);
  const title = rawFormData.title as string;
  const category = handleCategory(rawFormData.categoryId as string, oldItem);
  const images = await handleImages(
    type,
    filesToAdd,
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
    length: type === Type.SCULPTURE ? Number(rawFormData.length) : undefined,
    isToSell: rawFormData.isToSell === "on",
    price: Number(rawFormData.price),
    category,
    imageFilename: images.fileInfo ? images.fileInfo.filename : undefined,
    imageWidth: images.fileInfo ? images.fileInfo.width : undefined,
    imageHeight: images.fileInfo ? images.fileInfo.height : undefined,
    images: images.images
      ? {
          create: images.images,
        }
      : undefined,
  };
};

const getFilesTab = (formData: FormData, type: Type): File[] => {
  const tab: File[] = [];
  if (type === Type.SCULPTURE) {
    const files = formData.getAll("files") as File[];
    files.forEach((f) => {
      if (f.size > 0) tab.push(f);
    });
  } else {
    const file = formData.get("file") as File;
    if (file.size > 0) tab.push(file);
  }
  return tab;
};

type ImageResult = {
  fileInfo: { filename: string; width: number; height: number } | null;
  images: { filename: string; width: number; height: number }[] | null;
};

const handleImages = async (
  type: Type,
  files: File[],
  title: string,
  filenamesToDelete: string,
): Promise<ImageResult> => {
  const dir = getDir(type);
  if (filenamesToDelete) {
    for await (const filename of filenamesToDelete.split(",")) {
      deleteFile(dir, filename);
      if (type === Type.SCULPTURE)
        await prisma.sculptureImage.delete({
          where: { filename },
        });
    }
  }
  const result: ImageResult = {
    fileInfo: null,
    images: null,
  };

  if (files.length > 0) {
    if (type !== Type.SCULPTURE) {
      const fileInfo = await resizeAndSaveImage(files[0], title, dir);
      if (fileInfo) result.fileInfo = fileInfo;
    } else {
      const images = [];
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
      result.images = images;
    }
  }
  return result;
};

const handleCategory = (categoryId: string, oldItem: ItemFull | null) => {
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
