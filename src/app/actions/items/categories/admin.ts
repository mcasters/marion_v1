// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
"use server";

import { Type } from "@/lib/type";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import {
  getCategoryData,
  getCategoryModel,
} from "@/app/actions/items/categories/utils";

export async function createCategory(
  prevState: { message: string; isError: boolean } | null,
  formData: FormData,
) {
  const type = formData.get("type") as Type;
  const value = formData.get("value") as string;
  const data = getCategoryData(formData, null);
  const model = getCategoryModel(type);

  try {
    const alreadyExists = await model.findUnique({
      where: { value },
    });
    if (alreadyExists)
      return {
        message: "Erreur : nom de catégorie déjà existant",
        isError: true,
      };
    await model.create({ data });

    revalidatePath(`/admin/${type}s`);
    return { message: "Catégorie ajoutée", isError: false };
  } catch (e) {
    return { message: "Erreur à la création", isError: true };
  }
}

export async function updateCategory(
  prevState: { message: string; isError: boolean } | null,
  formData: FormData,
) {
  const type = formData.get("type") as Type;
  const id = Number(formData.get("id"));
  const model = getCategoryModel(type);

  try {
    const oldCat = await model.findUnique({
      where: { id },
      include: { content: true },
    });

    if (oldCat) {
      const data = getCategoryData(formData, oldCat);
      await model.update({
        where: { id },
        data,
      });
    }

    revalidatePath(`/admin/${type}s`);
    return { message: "Catégorie modifiée", isError: false };
  } catch (e) {
    return { message: "Erreur à la modification", isError: true };
  }
}

export async function deleteCategory(
  id: number,
  type: Type.PAINTING | Type.SCULPTURE | Type.DRAWING,
) {
  const model = getCategoryModel(type);

  try {
    const category = await model.findUnique({
      where: { id },
    });

    if (category) {
      const contentId = category.categoryContentId;
      if (contentId) {
        await prisma.categoryContent.delete({
          where: { id: contentId },
        });
      }
      await model.delete({
        where: { id },
      });
    }
    revalidatePath(`/admin/${type}s`);
    return { message: "Catégorie supprimée", isError: false };
  } catch (e) {
    return { message: "Erreur à la suppression", isError: true };
  }
}
