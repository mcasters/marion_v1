import { PresetColor, Theme } from "@prisma/client";
import { EnhancedTheme, OnlyString } from "@/lib/type";

import { BASE_PRESET_COLOR, BASE_THEME } from "@/constants/specific";

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
    const r = parseInt(array[1], 16) - 30;
    const g = parseInt(array[2], 16) - 30;
    const b = parseInt(array[3], 16) - 30;
    return rgbToHex(r <= 0 ? 0 : r, g <= 0 ? 0 : g, b <= 0 ? 0 : b);
  }
  return null;
}

export const getEnhancedTheme = (theme: Theme): EnhancedTheme => {
  return {
    id: theme.id,
    name: theme.name,
    isActive: theme.isActive,
    lineColor: theme.lineColor,
    titleColor: theme.titleColor,
    home: {
      menu1: {
        background: theme.menu1_background_home,
        text: "",
        link: theme.menu1_link_home,
        linkHover: theme.menu1_linkHover_home,
      },
      menu2: {
        background: theme.menu2_background_home,
        text: "",
        link: theme.menu2_link_home,
        linkHover: theme.menu2_linkHover_home,
      },
      main: {
        background: "",
        text: theme.main_text_home,
        link: "",
        linkHover: "",
      },
      footer: {
        background: theme.footer_background_home,
        text: theme.footer_background_home,
        link: theme.footer_link_home,
        linkHover: theme.footer_linkHover_home,
      },
    },
    item: {
      menu1: {
        background: theme.menu1_background_item,
        text: "",
        link: theme.menu1_link_item,
        linkHover: theme.menu1_linkHover_item,
      },
      menu2: {
        background: theme.menu2_background_item,
        text: "",
        link: theme.menu2_link_item,
        linkHover: theme.menu2_linkHover_item,
      },
      main: {
        background: theme.main_background_item,
        text: theme.main_text_item,
        link: theme.main_link_item,
        linkHover: theme.main_linkHover_item,
      },
      footer: {
        background: theme.footer_background_item,
        text: theme.footer_background_item,
        link: theme.footer_link_item,
        linkHover: theme.footer_linkHover_item,
      },
    },
    other: {
      menu1: {
        background: theme.menu1_background_other,
        text: "",
        link: theme.menu1_link_other,
        linkHover: theme.menu1_linkHover_other,
      },
      menu2: {
        background: theme.menu2_background_other,
        text: "",
        link: theme.menu2_link_other,
        linkHover: theme.menu2_linkHover_other,
      },
      main: {
        background: theme.main_background_other,
        text: theme.main_text_other,
        link: theme.main_link_other,
        linkHover: theme.main_linkHover_other,
      },
      footer: {
        background: theme.footer_background_other,
        text: theme.footer_background_other,
        link: theme.footer_link_other,
        linkHover: theme.footer_linkHover_other,
      },
    },
  };
};
