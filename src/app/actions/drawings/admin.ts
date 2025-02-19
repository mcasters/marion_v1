"use server";

import { deleteFile, getItemDir } from "@/utils/serverUtils";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { transformValueToKey } from "@/utils/commonUtils";
import { getItemData } from "@/app/actions/drawings/utils";
import { Type } from "@/lib/type";

export async function createItem(
  prevState: { message: string; isError: boolean } | null,
  formData: FormData,
) {
  const type = formData.get("type") as string;

  try {
    const data = await getItemData(type, formData, null);
    if (type === Type.PAINTING) await prisma.painting.create({ data });
    if (type === Type.DRAWING) await prisma.drawing.create({ data });
    if (type === Type.SCULPTURE) await prisma.sculpture.create({ data });

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
  const type = formData.get("type") as string;
  try {
    const oldItem =
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
      const data = await getItemData(type, formData, oldItem);
      if (type === Type.PAINTING)
        await prisma.painting.update({
          where: { id: id },
          data,
        });
      if (type === Type.SCULPTURE) {
        await prisma.sculpture.update({
          where: { id: id },
          data,
        });
      }
      if (type === Type.DRAWING)
        await prisma.drawing.update({
          where: { id: id },
          data,
        });
    }
    revalidatePath(`/admin/${type}s`);
    return { message: "Item modifié", isError: false };
  } catch (e) {
    return { message: `Erreur à l'enregistrement : ${e}`, isError: true };
  }
}

export async function deleteItem(
  id: number,
  type: Type.PAINTING | Type.SCULPTURE | Type.DRAWING,
) {
  try {
    const item =
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
        type === Type.PAINTING
          ? await prisma.painting.delete({
              where: {
                id,
              },
            })
          : await prisma.drawing.delete({
              where: {
                id,
              },
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
          where: {
            id,
          },
        });
      }
    }
    revalidatePath(`/admin/${type}s`);
    return { message: `Item supprimé`, isError: false };
  } catch (e) {
    return { message: "Erreur à la suppression", isError: true };
  }
}

export async function deleteCategoryDrawing(id: number) {
  try {
    const cat = await prisma.drawingCategory.findUnique({
      where: { id },
    });

    if (cat) {
      const contentId = cat.categoryContentId;
      if (contentId) {
        await prisma.categoryContent.delete({
          where: { id: contentId },
        });
      }

      await prisma.drawingCategory.delete({
        where: { id },
      });
    }
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
  const rawFormData = Object.fromEntries(formData);
  const value = rawFormData.value as string;

  try {
    await prisma.drawingCategory.create({
      data: {
        key: transformValueToKey(value),
        value,
        content: {
          create: {
            title: rawFormData.title as string,
            text: rawFormData.text as string,
            imageFilename: rawFormData.filename as string,
            imageWidth: Number(rawFormData.width),
            imageHeight: Number(rawFormData.height),
          },
        },
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
  const rawFormData = Object.fromEntries(formData);
  const id = Number(rawFormData.id);
  const value = rawFormData.value as string;

  try {
    const oldCat = await prisma.drawingCategory.findUnique({
      where: { id },
      include: { content: true },
    });

    if (oldCat) {
      let content;
      const data = {
        title: rawFormData.title as string,
        text: rawFormData.text as string,
        imageFilename: rawFormData.filename as string,
        imageWidth: Number(rawFormData.width),
        imageHeight: Number(rawFormData.height),
      };

      if (!oldCat.content) {
        content = {
          create: data,
        };
      } else {
        content = {
          update: data,
        };
      }

      await prisma.drawingCategory.update({
        where: { id },
        data: {
          key: transformValueToKey(value),
          value,
          content,
        },
      });
    }

    revalidatePath("/admin/dessins");
    return { message: "Catégorie modifiée", isError: false };
  } catch (e) {
    return { message: "Erreur à la modification", isError: true };
  }
}
