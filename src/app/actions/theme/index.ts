"use server";
import { PresetColor, Theme } from "@prisma/client";
import prisma from "@/lib/prisma";
import { THEME } from "@/constants/admin";
import { activateTheme } from "@/app/actions/theme/admin";
import { getBasePresetColorData, getBaseThemeData } from "@/utils/themeUtils";

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
    await activateTheme(theme.id);
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

// For admin
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

// For admin
export async function getThemesFull(): Promise<Theme[]> {
  const activatedTheme = await prisma.theme.findFirst({
    where: {
      isActive: true,
    },
  });
  if (!activatedTheme) {
    await getActivatedBaseTheme();
  }
  const res = await prisma.theme.findMany();

  return JSON.parse(JSON.stringify(res));
}
