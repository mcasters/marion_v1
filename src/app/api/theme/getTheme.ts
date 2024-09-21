import prisma from "@/lib/db/prisma";
import "server-only";
import { getBaseThemeData } from "@/utils/commonUtils";
import { PresetColor, Theme } from "@prisma/client";
import { getActivatedBaseTheme } from "@/lib/db/theme";

export async function getThemesFull(): Promise<Theme[]> {
  let res;
  res = await prisma.theme.findMany();

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
  let presetColors = await prisma.presetColor.findMany();

  return JSON.parse(JSON.stringify(presetColors));
}
