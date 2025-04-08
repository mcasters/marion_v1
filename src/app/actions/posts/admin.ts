"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { Type } from "@/lib/type";

import {
  addImages,
  deleteImages,
  getFilenameList,
} from "@/app/actions/actionUtils";

export async function createPost(
  prevState: { message: string; isError: boolean } | null,
  formData: FormData,
) {
  const rawFormData = Object.fromEntries(formData);

  try {
    const newImages = await addImages(formData, Type.POST);

    await prisma.post.create({
      data: {
        title: rawFormData.title as string,
        date: new Date(Number(rawFormData.date), 1),
        text: rawFormData.text as string,
        images: newImages
          ? {
              create: newImages,
            }
          : undefined,
      },
    });
    revalidatePath("/admin/posts");
    return { message: "Post ajouté", isError: false };
  } catch (e) {
    return { message: "Erreur à l'enregistrement", isError: true };
  }
}

export async function updatePost(
  prevState: { message: string; isError: boolean } | null,
  formData: FormData,
) {
  const rawFormData = Object.fromEntries(formData);
  const id = Number(rawFormData.id);

  try {
    await deleteImages(rawFormData.filenamesToDelete as string, Type.POST);
    const newImages = await addImages(formData, Type.POST);

    await prisma.post.update({
      where: { id },
      data: {
        title: rawFormData.title as string,
        date: new Date(Number(rawFormData.date), 1),
        text: rawFormData.text as string,
        images: newImages
          ? {
              create: newImages,
            }
          : undefined,
      },
    });

    revalidatePath("/admin/posts");
    return { message: "Post modifié", isError: false };
  } catch (e) {
    return { message: `Erreur à l'enregistrement`, isError: true };
  }
}

export async function deletePost(id: number) {
  try {
    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        images: {
          select: {
            filename: true,
          },
        },
      },
    });
    await deleteImages(getFilenameList(post.images), Type.POST);
    await prisma.post.delete({
      where: { id },
    });

    revalidatePath("/admin/posts");
    return { message: "Post supprimé", isError: false };
  } catch (e) {
    return { message: "Erreur à la suppression", isError: true };
  }
}
