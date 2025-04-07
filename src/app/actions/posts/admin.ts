"use server";

import { deleteFile, getDir, resizeAndSaveImage } from "@/utils/serverUtils";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { Type } from "@/lib/type";

export async function createPost(
  prevState: { message: string; isError: boolean } | null,
  formData: FormData,
) {
  const dir = getDir(Type.POST);
  const rawFormData = Object.fromEntries(formData);
  const title = rawFormData.title as string;
  const mainFile = rawFormData.file as File;
  const files = formData.getAll("files") as File[];

  try {
    const images = [];
    if (mainFile.size > 0) {
      images.push(await resizeAndSaveImage(mainFile, title, dir, true));
    }
    for (const file of files) {
      if (file.size > 0) {
        images.push(await resizeAndSaveImage(file, title, dir));
      }
    }

    await prisma.post.create({
      data: {
        title,
        date: new Date(Number(rawFormData.date), 1),
        text: rawFormData.text as string,
        images: {
          create: images,
        },
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
  const dir = getDir(Type.POST);
  const rawFormData = Object.fromEntries(formData);
  const id = Number(rawFormData.id);
  const filenamesToDelete = rawFormData.filenamesToDelete as string;
  const title = rawFormData.title as string;
  const mainFile = rawFormData.file as File;
  const files = formData.getAll("files") as File[];

  try {
    const oldPost = await prisma.post.findUnique({ where: { id } });

    if (oldPost) {
      if (filenamesToDelete) {
        for await (const filename of filenamesToDelete.split(",")) {
          deleteFile(dir, filename);
          await prisma.post.update({
            where: { id },
            data: {
              images: {
                delete: { filename },
              },
            },
          });
        }
      }

      const images = [];
      if (mainFile.size > 0)
        images.push(await resizeAndSaveImage(mainFile, title, dir, true));

      for (const file of files) {
        if (file.size > 0)
          images.push(await resizeAndSaveImage(file, title, dir));
      }

      await prisma.post.update({
        where: { id },
        data: {
          title,
          date: new Date(Number(rawFormData.date), 1),
          text: rawFormData.text as string,
          images: {
            create: images,
          },
        },
      });
    }

    revalidatePath("/admin/posts");
    return { message: "Post modifié", isError: false };
  } catch (e) {
    return { message: `Erreur à l'enregistrement`, isError: true };
  }
}

export async function deletePost(id: number) {
  const dir = getDir(Type.POST);
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

    if (post) {
      for (const image of post.images) {
        deleteFile(dir, image.filename);
      }
      await prisma.post.update({
        where: { id },
        data: {
          images: {
            delete: post.images,
          },
        },
      });
      await prisma.post.delete({
        where: { id },
      });
    }
    revalidatePath("/admin/posts");
    return { message: "Post supprimé", isError: false };
  } catch (e) {
    return { message: "Erreur à la suppression", isError: true };
  }
}
