"use server";

import { deleteFile, getMiscellaneousDir } from "@/utils/serverUtils";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { Label } from "@prisma/client";
import {
  findOrCreateContent,
  saveContentImage,
  updateText,
} from "@/app/actions/contents/queries";
import { ContentFull } from "@/lib/type";

export async function updateContent(
  prevState: { message: string; isError: boolean } | undefined,
  formData: FormData,
) {
  const label = formData.get("label") as Label;
  const text = formData.get("text") as string;

  try {
    const content = await findOrCreateContent(label);
    await updateText(content.id, text);

    return { message: "Contenu modifié", isError: false };
  } catch (e) {
    return { message: "Erreur à l'enregistrement", isError: true };
  }
}

export async function updateImageContent(
  prevState: { message: string; isError: boolean } | undefined,
  formData: FormData,
) {
  const label = formData.get("label") as Label;
  const bdContent = await findOrCreateContent(label);

  try {
    if (label === Label.SLIDER) await updateImageSlider(bdContent.id, formData);
    else await updateImagePresentation(bdContent, formData);

    const path =
      label === Label.PRESENTATION ? "/admin/presentation" : "/admin/home";
    revalidatePath(path);
    return { message: "Images modifiées", isError: false };
  } catch (e) {
    return { message: "Erreur à l'enregistrement", isError: true };
  }
}

async function updateImageSlider(id: number, formData: FormData) {
  const files = formData.getAll("files") as File[];

  for (const file of files) {
    if (file.size > 0) {
      const isMain = formData.get("isMain") === "true";
      const title = isMain ? "mobileSlider" : "desktopSlider";
      await saveContentImage(id, file, title, isMain);
    }
  }
}

async function updateImagePresentation(
  bdContent: ContentFull,
  formData: FormData,
) {
  const id = bdContent.id;
  const image = bdContent.images[0];
  const file = formData.get("file") as File;

  if (file && file.size > 0) {
    if (image) {
      const oldFilename = image.filename;
      deleteFile(getMiscellaneousDir(), oldFilename);
      await prisma.content.update({
        where: { id },
        data: {
          images: {
            delete: { filename: oldFilename },
          },
        },
      });
    }
    await saveContentImage(id, file, "presentation", false);
  }
}

export async function deleteContentImage(filename: string) {
  const dir = getMiscellaneousDir();

  try {
    if (filename) {
      const content = await prisma.content.findFirst({
        where: {
          images: {
            some: {
              filename,
            },
          },
        },
      });

      if (content) {
        deleteFile(dir, filename);
        await prisma.content.update({
          where: { id: content.id },
          data: {
            images: {
              delete: { filename },
            },
          },
        });
      }
    }
    const path = filename.startsWith("presentation")
      ? "/admin/presentation"
      : "/admin/home";
    revalidatePath(path);
    return { message: "Image supprimée", isError: false };
  } catch (e) {
    return { message: "Erreur à la suppression", isError: true };
  }
}
