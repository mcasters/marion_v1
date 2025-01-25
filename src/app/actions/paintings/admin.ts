"use server";

import {
  createDirIfNecessary,
  getPaintingDir,
  resizeAndSaveImage,
} from "@/utils/serverUtils";
import prisma from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";

export async function createPainting(
  prevState: { message: string; isError: boolean },
  formData: FormData,
) {
  const dir = getPaintingDir();
  createDirIfNecessary(dir);
  const rawFormData = Object.fromEntries(formData);
  const file = rawFormData.file;
  const title = rawFormData.title;
  const fileInfo = await resizeAndSaveImage(file, title, dir);

  try {
    if (fileInfo) {
      await prisma.painting.create({
        data: {
          title,
          date: new Date(Number(rawFormData.date), 1),
          technique: rawFormData.technique,
          description: rawFormData.description,
          height: Number(rawFormData.height),
          width: Number(rawFormData.width),
          isToSell: rawFormData.isToSell === "true",
          price: Number(rawFormData.price),
          imageFilename: fileInfo.filename,
          imageWidth: fileInfo.width,
          imageHeight: fileInfo.height,
          category:
            rawFormData.categoryId === ""
              ? {}
              : {
                  connect: {
                    id: Number(rawFormData.categoryId),
                  },
                },
        },
      });
    }
    revalidatePath("/admin/peintures");
    return { message: "Peinture enregistrée", isError: false };
  } catch (e) {
    return { message: "Erreur à l'enregistrement", isError: true };
  }
}
