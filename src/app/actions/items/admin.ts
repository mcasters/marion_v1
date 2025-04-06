// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
"use server";

import { deleteFile, getDir } from "@/utils/serverUtils";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getData, getItemModel } from "@/app/actions/items/utils";
import { ItemFull, Type } from "@/lib/type";

export async function createItem(
  prevState: { message: string; isError: boolean } | null,
  formData: FormData,
) {
  const type = formData.get("type") as Type;
  const model = getItemModel(type);

  try {
    await model.create({
      data: await getData(type, formData, null),
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
  const type = formData.get("type") as Type;
  const model = getItemModel(type);

  try {
    const oldItem: ItemFull = await model.findUnique({
      where: { id },
    });

    if (oldItem) {
      await model.update({
        where: { id },
        data: await getData(type, formData, oldItem),
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
  type: Type,
): Promise<{
  message: string;
  isError: boolean;
}> {
  const model = getItemModel(type);

  try {
    const item: ItemFull = await model.findUnique({
      where: { id },
      include:
        type === Type.SCULPTURE
          ? {
              images: {
                select: {
                  filename: true,
                },
              },
            }
          : undefined,
    });

    if (item) {
      const dir = getDir(type);
      for (const image of item.images) {
        deleteFile(dir, image.filename);
        if (type === Type.SCULPTURE)
          await prisma.sculptureImage.delete({
            where: {
              filename: image.filename,
            },
          });
      }
      await model.delete({
        where: { id },
      });
    }
    revalidatePath(`/admin/${type}s`);
    return { message: `Item supprimé`, isError: false };
  } catch (e) {
    return { message: "Erreur à la suppression", isError: true };
  }
}
