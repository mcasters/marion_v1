import { Type } from "@/lib/type";
import { deleteFile, getDir, resizeAndSaveImage } from "@/utils/serverUtils";
import prisma from "@/lib/prisma";

type FileInfo = {
  filename: string;
  width: number;
  height: number;
  isMain: boolean;
};

export const addImages = async (
  formData: FormData,
  type: Type,
): Promise<FileInfo[] | null> => {
  const tab: FileInfo[] = [];
  const title = formData.get("title") as string;
  const file = formData.get("file") as File;
  const files = formData.getAll("files") as File[];
  const dir = getDir(type);

  if (file && file.size > 0) {
    tab.push(
      <FileInfo>await resizeAndSaveImage(file, title, dir, type === Type.POST),
    );
  }
  if (files.length > 0) {
    for await (const file of files) {
      if (file.size > 0) {
        tab.push(<FileInfo>await resizeAndSaveImage(file, title, dir));
      }
    }
  }
  return tab.length > 0 ? tab : null;
};
export const deleteImages = async (filenamesToDelete: string, type: Type) => {
  const dir = getDir(type);

  if (filenamesToDelete === "") return;

  for await (const filename of filenamesToDelete.split(",")) {
    deleteFile(dir, filename);
    if (type === Type.SCULPTURE)
      await prisma.sculptureImage.delete({
        where: { filename },
      });
    if (type === Type.POST)
      await prisma.postImage.delete({
        where: { filename },
      });
  }
};
export const getFilenameList = (images: [{ filename: string }]): string => {
  let string = "";
  images.forEach((image, i) => {
    if (i === 0) string = image.filename;
    else string += `,${image.filename}`;
  });
  return string;
};
