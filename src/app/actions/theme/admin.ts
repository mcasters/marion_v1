"use server";

import prisma from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";
import { Theme } from "@prisma/client";
import { THEME } from "@/constants/admin";
import { OnlyString } from "@/lib/db/theme";

export async function createTheme(
  theme: Theme,
  prevState: { message: string; isError: boolean } | null,
  formData: FormData,
) {
  try {
    const { id, isActive, name, ...rest } = theme;
    await prisma.theme.create({
      data: {
        name: formData.get("name"),
        isActive: false,
        ...rest,
      },
    });

    revalidatePath("/admin");
    return { message: "Thème ajouté", isError: false };
  } catch (e) {
    return {
      message: `Erreur à l'enregistrement : ${e}`,
      isError: true,
      themes: null,
    };
  }
}

export async function updateTheme(theme: Theme) {
  try {
    const { id, ...rest } = theme;
    await prisma.theme.update({
      where: {
        id,
      },
      data: {
        ...rest,
      },
    });
    revalidatePath("/admin");
    return { message: `Theme "${theme.name}" modifié`, isError: false };
  } catch (e) {
    return { message: "Erreur à l'enregistrement", isError: true };
  }
}

export async function deleteTheme(id: number) {
  try {
    const themeToDelete = await prisma.theme.findUnique({
      where: {
        id,
      },
    });

    if (themeToDelete) {
      if (themeToDelete.name === THEME.BASE_THEME) {
        return {
          message: "le thème par défaut ne peut pas être supprimé",
          isError: true,
        };
      }
      if (themeToDelete.isActive) {
        await prisma.theme.update({
          where: {
            name: THEME.BASE_THEME,
          },
          data: {
            isActive: true,
          },
        });
      }
      await prisma.theme.delete({
        where: { id },
      });
    }
    revalidatePath("/admin");
    return { message: "Thème supprimé", isError: false };
  } catch (e) {
    return { message: "Erreur à la suppression", isError: true };
  }
}

export async function activateTheme(id: number) {
  try {
    const activatedTheme = await prisma.theme.update({
      where: {
        id,
      },
      data: {
        isActive: true,
      },
    });
    await prisma.theme.updateMany({
      where: {
        isActive: true,
        id: { not: id },
      },
      data: {
        isActive: false,
      },
    });
    revalidatePath("/admin");
    return { message: `Thème "${activatedTheme.name}" activé`, isError: false };
  } catch (e) {
    return { message: "Erreur à l'activation'", isError: true };
  }
}

export async function createPresetColor(name: string, color: string) {
  try {
    await prisma.presetColor.create({
      data: {
        name,
        color,
      },
    });
    revalidatePath("/admin");
    return { message: "Couleur perso ajoutée", isError: false };
  } catch (e) {
    return {
      message: "Erreur à la création de la couleur perso",
      isError: true,
    };
  }
}

export async function deletePresetColor(id: number) {
  try {
    const presetColor = await prisma.presetColor.findUnique({
      where: {
        id,
      },
    });

    if (presetColor) {
      const themes = await prisma.theme.findMany();
      const updatedThemes = [];
      for await (const theme of themes) {
        const updatedTheme = theme;
        let isModified = false;
        for await (const [key, value] of Object.entries(theme)) {
          if (
            value === presetColor.name &&
            key !== "name" &&
            key !== "isActive"
          ) {
            isModified = true;
            updatedTheme[key as keyof OnlyString<Theme>] = presetColor.color;
          }
        }
        if (isModified) updatedThemes.push(updatedTheme);
      }

      for await (const theme of updatedThemes) {
        const { id, ...rest } = theme;
        await prisma.theme.update({
          where: {
            id,
          },
          data: { ...rest },
        });
      }

      await prisma.presetColor.delete({
        where: { id },
      });
    }

    revalidatePath("/admin");
    return { message: "Couleur perso supprimée", isError: false };
  } catch (e) {
    return { message: "Erreur à la suppression", isError: true };
  }
}
