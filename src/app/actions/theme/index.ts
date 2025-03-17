"use server";
import { PresetColor, Theme } from "@prisma/client";
import prisma from "@/lib/prisma";
import { getBasePresetColorData, getBaseThemeData } from "@/utils/commonUtils";
import { THEME } from "@/constants/admin";
import { activateTheme } from "@/app/actions/theme/admin";

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

export async function getActiveTheme(themes: Theme[]): Promise<Theme> {
  let activeTheme = themes.find((t) => t.isActive);
  if (!activeTheme) {
    activeTheme = await getActivatedBaseTheme();
  }
  return JSON.parse(JSON.stringify(activeTheme));
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
