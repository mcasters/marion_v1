"use server";

import { deleteFile, getDrawingDir } from "@/utils/serverUtils";
import prisma from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";
import { transformValueToKey } from "@/utils/commonUtils";
import { Theme } from "@prisma/client";

export async function createTheme(
  theme: Theme,
  prevState: { message: string; isError: boolean } | null,
  formData: FormData,
) {
  try {
    const { id, isActive, name, ...rest } = theme;
    await prisma.theme.create({
      data: {
        name: formData.get("name"),
        isActive: false,
        ...rest,
      },
    });

    revalidatePath("/admin");
    return { message: "Thème ajouté", isError: false };
  } catch (e) {
    return {
      message: `Erreur à l'enregistrement : ${e}`,
      isError: true,
      themes: null,
    };
  }
}

export async function updateTheme(theme: Theme) {
  try {
    const { id, ...rest } = theme;
    await prisma.theme.update({
      where: {
        id,
      },
      data: {
        ...rest,
      },
    });
    revalidatePath("/admin");
    return { message: `Theme "${theme.name}" modifié`, isError: false };
  } catch (e) {
    return { message: "Erreur à l'enregistrement", isError: true };
  }
}

export async function deleteDrawing(id: number) {
  const dir = getDrawingDir();
  try {
    const drawing = await prisma.drawing.findUnique({
      where: { id },
    });
    if (drawing) {
      deleteFile(dir, drawing.images[0].filename);
      await prisma.drawing.delete({
        where: {
          id,
        },
      });
    }
    revalidatePath("/admin/dessins");
    return { message: "Dessin supprimé", isError: false };
  } catch (e) {
    return { message: "Erreur à la suppression", isError: true };
  }
}

export async function deleteCategoryDrawing(id: number) {
  try {
    await prisma.drawingCategory.delete({
      where: { id },
    });
    revalidatePath("/admin/dessins");
    return { message: "Catégorie supprimée", isError: false };
  } catch (e) {
    return { message: "Erreur à la suppression", isError: true };
  }
}

export async function createCategoryDrawing(
  prevState: { message: string; isError: boolean } | null,
  formData: FormData,
) {
  try {
    const value = formData.get("text") as string;
    const key = transformValueToKey(value);

    await prisma.drawingCategory.create({
      data: {
        key,
        value,
      },
    });
    revalidatePath("/admin/dessins");
    return { message: "Catégorie ajoutée", isError: false };
  } catch (e) {
    return { message: "Erreur à la création", isError: true };
  }
}

export async function updateCategoryDrawing(
  prevState: { message: string; isError: boolean } | null,
  formData: FormData,
) {
  try {
    const rawFormData = Object.fromEntries(formData);
    const id = Number(rawFormData.id);
    const value = rawFormData.text as string;
    const key = transformValueToKey(value);

    await prisma.drawingCategory.update({
      where: { id },
      data: {
        key,
        value,
      },
    });
    revalidatePath("/admin/dessins");
    return { message: "Catégorie modifiée", isError: false };
  } catch (e) {
    return { message: "Erreur à la modification", isError: true };
  }
}
