"use server";
import { PresetColor, Theme } from "@prisma/client";
import prisma from "@/lib/prisma";
import { cacheDBDatas } from "@/app/actions/actionUtils";
import {
  queryActiveTheme,
  queryPresetColors,
} from "@/app/actions/theme/queries";

export async function getActiveTheme(isAdmin: boolean): Promise<Theme> {
  const theme = await cacheDBDatas(
    () => queryActiveTheme(),
    isAdmin,
    "activeTheme",
  );

  return JSON.parse(JSON.stringify(theme));
}

export async function getPresetColors(
  isAdmin: boolean,
): Promise<PresetColor[]> {
  const presetColors = await cacheDBDatas(
    () => queryPresetColors(),
    isAdmin,
    "presetColors",
  );

  return JSON.parse(JSON.stringify(presetColors));
}

// For admin
export async function getThemesFull(): Promise<Theme[]> {
  const themes = await prisma.theme.findMany();

  return JSON.parse(JSON.stringify(themes));
}
