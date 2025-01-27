"use server";
import { PresetColor, Theme } from "@prisma/client";
import prisma from "@/lib/db/prisma";
import { getBasePresetColorData, getBaseThemeData } from "@/utils/commonUtils";
import { getActivatedBaseTheme } from "@/lib/db/theme";

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
