// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
"use server";

import { revalidatePath } from "next/cache";
import { getData, getItemModel } from "@/app/actions/items/utils";
import { ItemFull, Type } from "@/lib/type";
import { deleteImages, getFilenameList } from "@/app/actions/actionUtils";

export async function createItem(
  prevState: { message: string; isError: boolean } | null,
  formData: FormData,
) {
  const type = formData.get("type") as Type;
  const model = getItemModel(type);

  try {
    await model.create({
      data: await getData(type, formData),
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
    await model.update({
      where: { id },
      data: await getData(type, formData),
    });

    revalidatePath(`/admin/${type}s`);
    return { message: "Item modifié", isError: false };
  } catch (e) {
    return { message: `Erreur à l'enregistrement : ${e}`, isError: true };
  }
}

export async function deleteItem(id: number, type: Type) {
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
    await deleteImages(getFilenameList(item.images), type);
    await model.delete({
      where: { id },
    });

    revalidatePath(`/admin/${type}s`);
    return { message: `Item supprimé`, isError: false };
  } catch (e) {
    return { message: "Erreur à la suppression", isError: true };
  }
}
