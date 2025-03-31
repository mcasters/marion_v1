import { PresetColor, Theme } from "@prisma/client";
import { OnlyString, StructuredTheme } from "@/lib/type";

import { BASE_PRESET_COLOR, BASE_THEME } from "@/constants/specific";
import { cacheDatas, createNestedObject } from "@/utils/commonUtils";

export const getBaseThemeData = () => {
  return BASE_THEME;
};
export const getBasePresetColorData = () => {
  return BASE_PRESET_COLOR;
};
export const themeToHexa = (
  theme: Theme,
  presetColors: PresetColor[],
): Theme => {
  const updatedTheme = theme;
  Object.entries(theme).forEach(([key, value]) => {
    if (typeof value === "string" && value.charAt(0) !== "#") {
      presetColors.find((p) => {
        if (p.name === value) {
          updatedTheme[key as keyof OnlyString<Theme>] = p.color;
        }
      });
    }
  });
  return updatedTheme;
};
export const colorNameToHex = (
  colorName: string,
  presetColors: PresetColor[],
): string => {
  let colorHex = colorName;
  if (colorName.charAt(0) !== "#") {
    presetColors.find((p) => {
      if (p.name === colorName) {
        colorHex = p.color;
      }
    });
  }
  return colorHex;
};

export function hexToRgb(
  hex: string,
): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
} // hexToRgb("#0033ff").g; // "51";
function componentToHex(c: number): string {
  const hex = c.toString(16);
  return hex.length === 1 ? "0" + hex : hex;
}

export function rgbToHex(r: number, g: number, b: number): string {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
} // rgbToHex(0, 51, 255); // #0033ff
export function getBorderColor(colorHex: string): string | null {
  const array = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(colorHex);
  if (array) {
    const r = parseInt(array[1], 16) - 20;
    const g = parseInt(array[2], 16) - 20;
    const b = parseInt(array[3], 16) - 20;
    return rgbToHex(r <= 0 ? 0 : r, g <= 0 ? 0 : g, b <= 0 ? 0 : b);
  }
  return null;
}

export const getStructuredTheme = (theme: Theme): StructuredTheme => {
  const structuredTheme = {};
  Object.entries(theme).forEach(([key, value]) => {
    const stringSplit = key.split("_");

    if (stringSplit.length === 3) {
      const [pagePart, target, page] = stringSplit;
      createNestedObject(structuredTheme, page, pagePart)[target] = value;
    } else if (stringSplit.length === 2) {
      const [target, page] = stringSplit;
      createNestedObject(structuredTheme, page)[target] = value;
    }
  });
  return structuredTheme as StructuredTheme;
};

export const getStructHexaTheme = async (
  theme: Theme,
  presetColors: PresetColor[],
  isAdmin: boolean,
): Promise<StructuredTheme> => {
  return await cacheDatas(
    () => getStructuredTheme(themeToHexa(theme, presetColors)),
    isAdmin,
    "structuredHexaTheme",
  );
};
