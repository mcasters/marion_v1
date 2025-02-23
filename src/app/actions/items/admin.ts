"use server";

import { deleteFile, getItemDir } from "@/utils/serverUtils";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getItemType } from "@/utils/commonUtils";
import {
  getCategoryData,
  getPaintOrDrawData,
  getSculptData,
} from "@/app/actions/items/utils";
import { ItemFull, Type } from "@/lib/type";

export async function createItem(
  prevState: { message: string; isError: boolean } | null,
  formData: FormData,
) {
  const typeString = formData.get("type") as string;
  const type = getItemType(typeString);

  try {
    if (type === Type.PAINTING)
      await prisma.painting.create({
        data: await getPaintOrDrawData(type, formData, null),
      });
    if (type === Type.SCULPTURE)
      await prisma.sculpture.create({
        data: await getSculptData(formData, null),
      });
    if (type === Type.DRAWING)
      await prisma.drawing.create({
        data: await getPaintOrDrawData(type, formData, null),
      });

    revalidatePath(`/admin/${type}s`);
    return { message: `Item ajouté`, isError: false };
  } catch (e) {
    return { message: `Erreur à l'enregistrement`, isError: true };
  }
}

export async function updateItem(
  prevState: { message: string; isError: boolean } | null,
  formData: FormData,
) {
  const id = Number(formData.get("id"));
  const typeString = formData.get("type") as string;
  const type = getItemType(typeString);
  try {
    const oldItem: ItemFull =
      type === Type.PAINTING
        ? await prisma.painting.findUnique({
            where: { id },
          })
        : type === Type.SCULPTURE
          ? await prisma.sculpture.findUnique({
              where: { id },
            })
          : type === Type.DRAWING
            ? await prisma.drawing.findUnique({
                where: { id },
              })
            : null;

    if (oldItem) {
      if (type === Type.PAINTING)
        await prisma.painting.update({
          where: { id },
          data: await getPaintOrDrawData(type, formData, oldItem),
        });
      if (type === Type.SCULPTURE)
        await prisma.sculpture.update({
          where: { id },
          data: await getSculptData(formData, oldItem),
        });
      if (type === Type.DRAWING)
        await prisma.drawing.update({
          where: { id },
          data: await getPaintOrDrawData(type, formData, oldItem),
        });
    }
    revalidatePath(`/admin/${type}s`);
    return { message: "Item modifié", isError: false };
  } catch (e) {
    return { message: `Erreur à l'enregistrement`, isError: true };
  }
}

export async function deleteItem(
  id: number,
  type: Type.PAINTING | Type.SCULPTURE | Type.DRAWING,
) {
  try {
    const item: ItemFull =
      type === Type.PAINTING
        ? await prisma.painting.findUnique({
            where: { id },
          })
        : type === Type.SCULPTURE
          ? await prisma.sculpture.findUnique({
              where: { id },
              include: {
                images: {
                  select: {
                    filename: true,
                  },
                },
              },
            })
          : type === Type.DRAWING
            ? await prisma.drawing.findUnique({
                where: { id },
              })
            : null;

    if (item) {
      const dir = getItemDir(type);
      if (type === Type.PAINTING || type === Type.DRAWING) {
        deleteFile(dir, item.images[0].filename);
        if (type === Type.PAINTING)
          await prisma.painting.delete({
            where: { id },
          });
        else
          await prisma.drawing.delete({
            where: { id },
          });
      }
      if (type === Type.SCULPTURE) {
        for (const image of item.images) {
          deleteFile(dir, image.filename);
          await prisma.sculptureImage.delete({
            where: {
              filename: image.filename,
            },
          });
        }
        await prisma.sculpture.delete({
          where: { id },
        });
      }
    }
    revalidatePath(`/admin/${type}s`);
    return { message: `Item supprimé`, isError: false };
  } catch (e) {
    return { message: "Erreur à la suppression", isError: true };
  }
}

export async function createCategory(
  prevState: { message: string; isError: boolean } | null,
  formData: FormData,
) {
  const typeString = formData.get("type") as string;
  const type = getItemType(typeString);

  try {
    const data = getCategoryData(formData, null);
    if (type === Type.PAINTING) await prisma.paintingCategory.create({ data });
    if (type === Type.DRAWING) await prisma.drawingCategory.create({ data });
    if (type === Type.SCULPTURE)
      await prisma.sculptureCategory.create({ data });

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
  const typeString = formData.get("type") as string;
  const type = getItemType(typeString);
  const id = Number(formData.get("id"));

  try {
    const oldCat =
      type === Type.PAINTING
        ? await prisma.paintingCategory.findUnique({
            where: { id },
            include: { content: true },
          })
        : type === Type.SCULPTURE
          ? await prisma.sculptureCategory.findUnique({
              where: { id },
              include: { content: true },
            })
          : type === Type.DRAWING
            ? await prisma.drawingCategory.findUnique({
                where: { id },
                include: { content: true },
              })
            : null;

    if (oldCat) {
      const data = getCategoryData(formData, oldCat);

      if (type === Type.PAINTING)
        await prisma.paintingCategory.update({
          where: { id },
          data,
        });
      if (type === Type.SCULPTURE)
        await prisma.sculptureCategory.update({
          where: { id },
          data,
        });
      if (type === Type.DRAWING)
        await prisma.drawingCategory.update({
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
  try {
    const category =
      type === Type.PAINTING
        ? await prisma.paintingCategory.findUnique({
            where: { id },
          })
        : type === Type.SCULPTURE
          ? await prisma.sculptureCategory.findUnique({
              where: { id },
            })
          : type === Type.DRAWING
            ? await prisma.drawingCategory.findUnique({
                where: { id },
              })
            : null;

    if (category) {
      const contentId = category.categoryContentId;
      if (contentId) {
        await prisma.categoryContent.delete({
          where: { id: contentId },
        });
      }

      if (type === Type.PAINTING)
        await prisma.paintingCategory.delete({
          where: { id },
        });
      if (type === Type.SCULPTURE)
        await prisma.sculptureCategory.delete({
          where: { id },
        });
      if (type === Type.DRAWING)
        await prisma.drawingCategory.delete({
          where: { id },
        });
    }
    revalidatePath(`/admin/${type}s`);
    return { message: "Catégorie supprimée", isError: false };
  } catch (e) {
    return { message: "Erreur à la suppression", isError: true };
  }
}
