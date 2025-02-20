"use server";

import {
  deleteFile,
  getPostDir,
  resizeAndSaveImage,
} from "@/utils/serverUtils";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createPost(
  prevState: { message: string; isError: boolean } | null,
  formData: FormData,
) {
  const dir = getPostDir();
  const rawFormData = Object.fromEntries(formData);
  const mainFile = rawFormData.file as File;
  const files = formData.getAll("files") as File[];
  const title = rawFormData.title as string;

  try {
    const images = [];
    if (mainFile.size > 0) {
      const fileInfo = await resizeAndSaveImage(mainFile, title, dir);
      if (fileInfo)
        images.push({
          filename: fileInfo.filename,
          width: fileInfo.width,
          height: fileInfo.height,
          isMain: true,
        });
    }
    for (const file of files) {
      if (file.size > 0) {
        const fileInfo = await resizeAndSaveImage(file, title, dir);
        if (fileInfo)
          images.push({
            filename: fileInfo.filename,
            width: fileInfo.width,
            height: fileInfo.height,
          });
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
  const dir = getPostDir();
  const rawFormData = Object.fromEntries(formData);
  const id = Number(rawFormData.id);

  try {
    const oldPost = await prisma.post.findUnique({
      where: { id },
      include: {
        images: {
          select: {
            filename: true,
            isMain: true,
          },
        },
      },
    });

    if (oldPost) {
      const mainFilenameToDelete = rawFormData.mainFilenameToDelete as string;
      if (mainFilenameToDelete) {
        deleteFile(dir, mainFilenameToDelete);
        await prisma.postImage.delete({
          where: { filename: mainFilenameToDelete },
        });
      }
      const filenamesToDelete = rawFormData.filenamesToDelete as string;
      if (filenamesToDelete) {
        for await (const filename of filenamesToDelete.split(",")) {
          deleteFile(dir, filename);
          await prisma.postImage.delete({
            where: { filename },
          });
        }
      }

      const images = [];
      const mainFile = rawFormData.file as File;
      const title = rawFormData.title as string;
      if (mainFile.size > 0) {
        const fileInfo = await resizeAndSaveImage(mainFile, title, dir);
        if (fileInfo)
          images.push({
            filename: fileInfo.filename,
            width: fileInfo.width,
            height: fileInfo.height,
            isMain: true,
          });

        const oldMainImage = oldPost.images.filter((i) => i.isMain);
        if (oldMainImage.length > 0) {
          const filename = oldMainImage[0].filename;
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

      const files = formData.getAll("files") as File[];
      for (const file of files) {
        if (file.size > 0) {
          const fileInfo = await resizeAndSaveImage(file, title, dir);
          if (fileInfo)
            images.push({
              filename: fileInfo.filename,
              width: fileInfo.width,
              height: fileInfo.height,
            });
        }
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
  const dir = getPostDir();
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
