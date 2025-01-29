"use server";
import { PresetColor, Theme } from "@prisma/client";
import prisma from "@/lib/prisma";
import { getBasePresetColorData, getBaseThemeData } from "@/utils/commonUtils";
import { THEME } from "@/constants/admin";

export async function getThemesFull(): Promise<Theme[]> {
  const res = await prisma.theme.findMany();

  if (res.length === 0) {
    const defaultTheme = await prisma.theme.create({
      data: {
        ...getBaseThemeData(),
      },
    });
    res.push(defaultTheme);
  }
  return JSON.parse(JSON.stringify(res));
}

export const activate = async (themeId: number): Promise<void> => {
  await prisma.theme.update({
    where: {
      id: themeId,
    },
    data: {
      isActive: true,
    },
  });

  await prisma.theme.updateMany({
    where: {
      isActive: true,
      id: { not: themeId },
    },
    data: {
      isActive: false,
    },
  });
};

const getActivatedBaseTheme = async (): Promise<Theme> => {
  let theme = await prisma.theme.findUnique({
    where: {
      name: THEME.BASE_THEME,
    },
  });
  if (!theme) {
    theme = await prisma.theme.create({
      data: {
        ...getBaseThemeData(),
      },
    });
  }
  if (!theme.isActive) {
    await activate(theme.id);
  }
  return theme;
};

export async function getActiveTheme(): Promise<Theme> {
  let theme = await prisma.theme.findFirst({
    where: {
      isActive: true,
    },
  });
  if (!theme) {
    theme = await getActivatedBaseTheme();
  }
  return JSON.parse(JSON.stringify(theme));
}

export async function getPresetColors(): Promise<PresetColor[]> {
  const presetColors = await prisma.presetColor.findMany();

  if (presetColors.length === 0) {
    const defaultPresetColor = await prisma.presetColor.create({
      data: {
        ...getBasePresetColorData(),
      },
    });
    presetColors.push(defaultPresetColor);
  }
  return JSON.parse(JSON.stringify(presetColors));
}
