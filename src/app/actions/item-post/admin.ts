// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
"use server";

import { revalidatePath } from "next/cache";
import {
  deleteImages,
  getData,
  getFilenameList,
  getItemModel,
} from "@/app/actions/item-post/utils";
import { Type } from "@/lib/type";

export async function createItem(
  prevState: { message: string; isError: boolean } | null,
  formData: FormData,
) {
  const type = formData.get("type") as Type;
  const model = getItemModel(type);
  console.log("model// ", model);

  try {
    await model.create({
      data: await getData(type, formData),
    });

    revalidatePath(`/admin/${type}s`);
    return { message: `Item ajouté`, isError: false };
  } catch (e) {
    return { message: `Erreur à l'enregistrement : ${e}`, isError: true };
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
    const item = await model.findUnique({
      where: { id },
      include:
        type === Type.SCULPTURE || type === Type.POST
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
