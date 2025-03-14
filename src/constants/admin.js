import { Theme } from "@prisma/client";

export const PAGE_TYPE = {
  GENERAL: "Commun",
  ITEM: "Pages d'items",
  OTHERS: "Autres pages",
  HOME: "Page home",
};

export const THEME_PROPS = {
  // general
  [Theme.lineColor]: {
    label: "Ligne au top",
    pageType: PAGE_TYPE.GENERAL,
  },
  [Theme.backgroundColor]: {
    label: "Fond",
    pageType: PAGE_TYPE.GENERAL,
  },
  [Theme.color]: {
    label: "Texte",
    pageType: PAGE_TYPE.GENERAL,
  },
};

const dd = {
  [Theme.linkColor]: "Liens",
  [Theme.linkHoverColor]: "Liens pointés*",

  // Home
  [Theme.titleColor]: "Titre",
  [Theme.menu1HomeColor]: "Menu 1 - fond",
  [Theme.menu1LinkHomeColor]: "Menu 1 - texte",
  [Theme.menu1LinkHomeHoverColor]: "Menu 1 - texte pointé*",
  [Theme.menu2HomeColor]: "Menu 2 - fond",
  [Theme.menu2LinkHomeColor]: "Menu 2 - texte",
  [Theme.menu2LinkHomeHoverColor]: "Menu 2 - texte pointé*",

  // other pages
  [Theme.menu1Color]: "Menu 1 - fond",
  [Theme.menu1LinkColor]: "Menu 1 - texte",
  [Theme.menu1LinkHoverColor]: "Menu 1 - texte pointé*",
  [Theme.menu2Color]: "Menu 2 - fond",
  [Theme.menu2LinkColor]: "Menu 2 - texte",
  [Theme.menu2LinkHoverColor]: "Menu 2 - texte ponté*",

  // item
  [Theme.backgroundColorItem]: "Fond",
  [Theme.colorItem]: "Texte",
  [Theme.linkItemColor]: "Liens",
  [Theme.linkHoverItemColor]: "Liens pointés*",
  [Theme.menu1ItemColor]: "Menu 1 - fond",
  [Theme.menu1LinkItemColor]: "Menu 1 - texte",
  [Theme.menu1LinkHoverItemColor]: "Menu 1 - texte pointé*",
  [Theme.menu2ItemColor]: "Menu 2 - fond",
  [Theme.menu2LinkItemColor]: "Menu 2 - texte",
  [Theme.menu2LinkHoverItemColor]: "Menu 2 - texte pointé*",
};

export const THEME = {
  Theme: "Thème de base",
};

export const COOKIE_NAME = "adminSession";
