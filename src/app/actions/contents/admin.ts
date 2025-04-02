"use server";

import {
  deleteFile,
  getMiscellaneousDir,
  resizeAndSaveImage,
} from "@/utils/serverUtils";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { Label } from "@prisma/client";

export async function updateSliderContent(
  prevState: { message: string; isError: boolean } | undefined,
  formData: FormData,
) {
  try {
    const dir = getMiscellaneousDir();

    let BDContent = await prisma.content.findUnique({
      where: {
        label: Label.SLIDER,
      },
      include: {
        images: {
          select: {
            filename: true,
          },
        },
      },
    });

    if (!BDContent) {
      BDContent = await prisma.content.create({
        data: {
          label: Label.SLIDER,
          title: "",
          text: formData.get("text") as string | "",
          images: {},
        },
        include: { images: true },
      });
    }

    const id = BDContent.id;

    const files = formData.getAll("files") as File[];
    for (const file of files) {
      if (file.size > 0) {
        const isMain = formData.get("isMain") === "true";
        const title = isMain ? "mobileSlider" : "desktopSlider";
        const fileInfo = await resizeAndSaveImage(file, title, dir);
        if (fileInfo) {
          await prisma.content.update({
            where: { id },
            data: {
              images: {
                create: {
                  filename: fileInfo.filename,
                  width: fileInfo.width,
                  height: fileInfo.height,
                  isMain,
                },
              },
            },
          });
        }
      }
    }

    revalidatePath("/admin/home");
    return { message: "Images modifiées", isError: false };
  } catch (e) {
    return { message: "Erreur à l'enregistrement", isError: true };
  }
}

export async function updateImagePresentationContent(
  prevState: { message: string; isError: boolean } | undefined,
  formData: FormData,
) {
  try {
    const dir = getMiscellaneousDir();

    let BDContent = await prisma.content.findUnique({
      where: {
        label: Label.PRESENTATION,
      },
      include: {
        images: {
          select: {
            filename: true,
          },
        },
      },
    });

    if (!BDContent) {
      BDContent = await prisma.content.create({
        data: {
          label: Label.PRESENTATION,
          title: "",
          text: formData.get("text") as string | "",
          images: {},
        },
        include: { images: true },
      });
    }

    const id = BDContent.id;
    const file = formData.get("file") as File;
    if (file && file.size > 0) {
      if (BDContent.images.length > 0) {
        const oldFilename = BDContent.images[0].filename;
        deleteFile(dir, oldFilename);
        await prisma.content.update({
          where: { id },
          data: {
            images: {
              delete: { filename: oldFilename },
            },
          },
        });
      }
      const fileInfo = await resizeAndSaveImage(file, "presentation", dir);
      if (fileInfo) {
        await prisma.content.update({
          where: { id },
          data: {
            images: {
              create: {
                filename: fileInfo.filename,
                width: fileInfo.width,
                height: fileInfo.height,
              },
            },
          },
        });
      }
    }

    revalidatePath("/admin/presentation");
    return { message: "Contenu modifié", isError: false };
  } catch (e) {
    return { message: "Erreur à l'enregistrement", isError: true };
  }
}

export async function updatePresentationTextContent(
  prevState: { message: string; isError: boolean } | undefined,
  formData: FormData,
) {
  try {
    let BDContent = await prisma.content.findUnique({
      where: {
        label: Label.PRESENTATION,
      },
      include: {
        images: {
          select: {
            filename: true,
          },
        },
      },
    });

    if (!BDContent) {
      BDContent = await prisma.content.create({
        data: {
          label: Label.PRESENTATION,
          title: "",
          text: formData.get("text") as string | "",
          images: {},
        },
        include: { images: true },
      });
    } else {
      const id = BDContent.id;
      await prisma.content.update({
        where: {
          id,
        },
        data: {
          text: formData.get("text") as string,
        },
        include: { images: true },
      });
    }

    revalidatePath("/admin/presentation");
    return { message: "Contenu modifié", isError: false };
  } catch (e) {
    return { message: "Erreur à l'enregistrement", isError: true };
  }
}

export async function updateContent(
  prevState: { message: string; isError: boolean } | undefined,
  formData: FormData,
) {
  try {
    const dir = getMiscellaneousDir();
    const label = formData.get("label") as Label;

    let BDContent = await prisma.content.findUnique({
      where: {
        label,
      },
      include: {
        images: {
          select: {
            filename: true,
          },
        },
      },
    });

    if (!BDContent) {
      BDContent = await prisma.content.create({
        data: {
          label,
          title: "",
          text: formData.get("text") as string | "",
          images: {},
        },
        include: { images: true },
      });
    }

    const id = BDContent.id;

    // Content with only images (Label.SLIDER)
    if (label === Label.SLIDER) {
      const files = formData.getAll("files") as File[];
      for (const file of files) {
        if (file.size > 0) {
          const isMain = formData.get("isMain") === "true";
          const title = isMain ? "mobileSlider" : "desktopSlider";
          const fileInfo = await resizeAndSaveImage(file, title, dir);
          if (fileInfo) {
            await prisma.content.update({
              where: { id },
              data: {
                images: {
                  create: {
                    filename: fileInfo.filename,
                    width: fileInfo.width,
                    height: fileInfo.height,
                    isMain,
                  },
                },
              },
            });
          }
        }
      }
    } else {
      const file = formData.get("file") as File;
      if (label === Label.PRESENTATION && file) {
        // Contents with only one image (Image PRESENTATION)
        if (file && file.size > 0) {
          if (BDContent.images.length > 0) {
            const oldFilename = BDContent.images[0].filename;
            deleteFile(dir, oldFilename);
            await prisma.content.update({
              where: { id },
              data: {
                images: {
                  delete: { filename: oldFilename },
                },
              },
            });
          }
          const fileInfo = await resizeAndSaveImage(file, "presentation", dir);
          if (fileInfo) {
            await prisma.content.update({
              where: { id },
              data: {
                images: {
                  create: {
                    filename: fileInfo.filename,
                    width: fileInfo.width,
                    height: fileInfo.height,
                  },
                },
              },
            });
          }
        }
      } else {
        await prisma.content.update({
          where: {
            id,
          },
          data: {
            text: formData.get("text") as string,
          },
          include: { images: true },
        });
      }
    }

    const path =
      label === Label.SLIDER
        ? "/admin/home"
        : label === Label.PRESENTATION
          ? "/admin/presentation"
          : "/admin/contact";

    revalidatePath(path);
    return { message: "Contenu modifié", isError: false };
  } catch (e) {
    return { message: "Erreur à l'enregistrement", isError: true };
  }
}

export async function deleteContentImage(filename: string) {
  const dir = getMiscellaneousDir();

  try {
    if (filename) {
      const content = await prisma.content.findFirst({
        where: {
          images: {
            some: {
              filename,
            },
          },
        },
      });

      if (content) {
        deleteFile(dir, filename);
        await prisma.content.update({
          where: { id: content.id },
          data: {
            images: {
              delete: { filename },
            },
          },
        });
      }
    }
    const path = filename.startsWith("presentation")
      ? "/admin/presentation"
      : "/admin/home";
    revalidatePath(path);
    return { message: "Image supprimée", isError: false };
  } catch (e) {
    return { message: "Erreur à la suppression", isError: true };
  }
}
