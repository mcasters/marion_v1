export const THEME = {
  BASE_THEME: "Thème de base",
};

export const THEME_PROPS = {
  // general
  LINE_COLOR: "lineColor",
  BD_COLOR: "backgroundColor",
  TITLE_COLOR: "titleColor",
  COLOR: "color",
  LINK_COLOR: "linkColor",
  LINK_HOVER_COLOR: "linkHoverColor",

  // item
  BD_COLOR_ITEM: "backgroundColorItem",
  COLOR_ITEM: "colorItem",
  LINK_ITEM_COLOR: "linkItemColor",
  LINK_HOVER_ITEM_COLOR: "linkHoverItemColor",

  /*
   menu 1
   */
  // general
  MENU_1_COLOR: "menu1Color",
  MENU_1_LINK_COLOR: "menu1LinkColor",
  MENU_1_LINK_HOVER_COLOR: "menu1LinkHoverColor",

  // home
  MENU_1_HOME_COLOR: "menu1HomeColor",
  MENU_1_LINK_HOME_COLOR: "menu1LinkHomeColor",
  MENU_1_LINK_HOVER_HOME_COLOR: "menu1LinkHomeHoverColor",

  // item
  MENU_1_ITEM_COLOR: "menu1ItemColor",
  MENU_1_LINK_ITEM_COLOR: "menu1LinkItemColor",
  MENU_1_LINK_HOVER_ITEM_COLOR: "menu1LinkHoverItemColor",

  /*
   menu 2
   */
  // general
  MENU_2_COLOR: "menu2Color",
  MENU_2_LINK_COLOR: "menu2LinkColor",
  MENU_2_LINK_HOVER_COLOR: "menu2LinkHoverColor",

  // home
  MENU_2_HOME_COLOR: "menu2HomeColor",
  MENU_2_LINK_HOME_COLOR: "menu2LinkHomeColor",
  MENU_2_LINK_HOVER_HOME_COLOR: "menu2LinkHomeHoverColor",

  // item
  MENU_2_ITEM_COLOR: "menu2ItemColor",
  MENU_2_LINK_ITEM_COLOR: "menu2LinkItemColor",
  MENU_2_LINK_HOVER_ITEM_COLOR: "menu2LinkHoverItemColor",
};

export const PAGE_TYPE = {
  GENERAL: "Commun",
  ITEM: "Pages d'items",
  OTHERS: "Autres pages",
  HOME: "Page home",
};

export const THEME_DATAS = {
  // general
  [THEME_PROPS.LINK_COLOR]: {
    label: "Ligne au top",
    pageType: PAGE_TYPE.GENERAL,
  },
  [THEME_PROPS.BD_COLOR]: {
    label: "Fond",
    pageType: PAGE_TYPE.GENERAL,
  },
  [THEME_PROPS.COLOR]: {
    label: "Texte",
    pageType: PAGE_TYPE.GENERAL,
  },
  [THEME_PROPS.LINK_COLOR]: {
    label: "Liens",
    pageType: PAGE_TYPE.GENERAL,
  },
  [THEME_PROPS.LINK_HOVER_COLOR]: {
    label: "Liens pointés*",
    pageType: PAGE_TYPE.GENERAL,
  },

  // Home
  [THEME_PROPS.TITLE_COLOR]: {
    label: "Titre",
    pageType: PAGE_TYPE.HOME,
  },
  [THEME_PROPS.MENU_1_HOME_COLOR]: {
    label: "Menu 1 - fond",
    pageType: PAGE_TYPE.HOME,
  },
  [THEME_PROPS.MENU_1_LINK_HOME_COLOR]: {
    label: "Menu 1 - texte",
    pageType: PAGE_TYPE.HOME,
  },
  [THEME_PROPS.MENU_1_LINK_HOVER_HOME_COLOR]: {
    label: "Menu 1 - texte pointé*",
    pageType: PAGE_TYPE.HOME,
  },
  [THEME_PROPS.MENU_2_HOME_COLOR]: {
    label: "Menu 2 - fond",
    pageType: PAGE_TYPE.HOME,
  },
  [THEME_PROPS.MENU_2_LINK_HOME_COLOR]: {
    label: "Menu 2 - texte",
    pageType: PAGE_TYPE.HOME,
  },
  [THEME_PROPS.MENU_2_LINK_HOVER_HOME_COLOR]: {
    label: "Menu 2 - texte pointé*",
    pageType: PAGE_TYPE.HOME,
  },

  // other pages
  [THEME_PROPS.MENU_1_COLOR]: {
    label: "Menu 1 - fond",
    pageType: PAGE_TYPE.OTHERS,
  },
  [THEME_PROPS.MENU_1_LINK_COLOR]: {
    label: "Menu 1 - texte",
    pageType: PAGE_TYPE.OTHERS,
  },
  [THEME_PROPS.MENU_1_LINK_HOVER_COLOR]: {
    label: "Menu 1 - texte pointé*",
    pageType: PAGE_TYPE.OTHERS,
  },
  [THEME_PROPS.MENU_2_COLOR]: {
    label: "Menu 2 - fond",
    pageType: PAGE_TYPE.OTHERS,
  },
  [THEME_PROPS.MENU_2_LINK_COLOR]: {
    label: "Menu 2 - texte",
    pageType: PAGE_TYPE.OTHERS,
  },
  [THEME_PROPS.MENU_2_LINK_HOVER_COLOR]: {
    label: "Menu 2 - texte ponté*",
    pageType: PAGE_TYPE.OTHERS,
  },

  // item
  [THEME_PROPS.BD_COLOR_ITEM]: {
    label: "Fond",
    pageType: PAGE_TYPE.ITEM,
  },
  [THEME_PROPS.COLOR_ITEM]: {
    label: "Texte",
    pageType: PAGE_TYPE.ITEM,
  },
  [THEME_PROPS.LINK_ITEM_COLOR]: {
    label: "Liens",
    pageType: PAGE_TYPE.ITEM,
  },
  [THEME_PROPS.LINK_HOVER_ITEM_COLOR]: {
    label: "Liens pointés*",
    pageType: PAGE_TYPE.ITEM,
  },
  [THEME_PROPS.MENU_1_ITEM_COLOR]: {
    label: "Menu 1 - fond",
    pageType: PAGE_TYPE.ITEM,
  },
  [THEME_PROPS.MENU_1_LINK_ITEM_COLOR]: {
    label: "Menu 1 - texte",
    pageType: PAGE_TYPE.ITEM,
  },
  [THEME_PROPS.MENU_1_LINK_HOVER_ITEM_COLOR]: {
    label: "Menu 1 - texte pointé*",
    pageType: PAGE_TYPE.ITEM,
  },
  [THEME_PROPS.MENU_2_ITEM_COLOR]: {
    label: "Menu 2 - fond",
    pageType: PAGE_TYPE.ITEM,
  },
  [THEME_PROPS.MENU_2_LINK_ITEM_COLOR]: {
    label: "Menu 2 - texte",
    pageType: PAGE_TYPE.ITEM,
  },
  [THEME_PROPS.MENU_2_LINK_HOVER_ITEM_COLOR]: {
    label: "Menu 2 - texte pointé*",
    pageType: PAGE_TYPE.ITEM,
  },
};

export const COOKIE_NAME = "adminSession";

/* SEO */
export const META = {
  SITE_TITLE: "siteTitle",
  SITE_EMAIL: "siteEmail",
  FOOTER: "footerContent",
  INSTAGRAM: "instagram",
  PAINTING_LAYOUT: "paintingLayout",
  SCULPTURE_LAYOUT: "sculptureLayout",
  DRAWING_LAYOUT: "drawingLayout",
  HOME_LAYOUT: "homeLayout",

  SEO_SITE_TITLE: "seoSiteTitle",
  URL: "url",
  KEYWORDS: "keywords",

  DOCUMENT_TITLE_HOME: "documentTitleHome",
  DESCRIPTION_HOME: "descriptionHome",

  DOCUMENT_TITLE_PAINTING_HOME: "documentTitlePaintingHome",
  DESCRIPTION_PAINTING_HOME: "descriptionPaintingHome",
  DOCUMENT_TITLE_PAINTING: "documentTitlePainting",
  DESCRIPTION_PAINTING: "descriptionPainting",

  DOCUMENT_TITLE_SCULPTURE_HOME: "documentTitleSculptureHome",
  DESCRIPTION_SCULPTURE_HOME: "descriptionSculptureHome",
  DOCUMENT_TITLE_SCULPTURE: "documentTitleSculpture",
  DESCRIPTION_SCULPTURE: "descriptionSculpture",

  DOCUMENT_TITLE_DRAWING_HOME: "documentTitleDrawingHome",
  DESCRIPTION_DRAWING_HOME: "descriptionDrawingHome",
  DOCUMENT_TITLE_DRAWING: "documentTitleDrawing",
  DESCRIPTION_DRAWING: "descriptionDrawing",

  DOCUMENT_TITLE_POST: "documentTitlePost",
  DESCRIPTION_POST: "descriptionPost",

  DOCUMENT_TITLE_PRESENTATION: "documentTitlePresentation",
  DESCRIPTION_PRESENTATION: "descriptionPresentation",

  DOCUMENT_TITLE_CONTACT: "documentTitleContact",
  DESCRIPTION_CONTACT: "descriptionContact",
};

export const SEO = {
  [META.SEO_SITE_TITLE]: "Titre du site",
  [META.URL]: "Url du site",
  [META.KEYWORDS]: "Mots clés",

  [META.DOCUMENT_TITLE_HOME]: "Titre de la page home",
  [META.DESCRIPTION_HOME]: "Description de la page home",

  [META.DOCUMENT_TITLE_PAINTING_HOME]:
    "Titre de la page d'accueil des peintures",
  [META.DESCRIPTION_PAINTING_HOME]:
    "Description de la page d'accueil des peintures",
  [META.DOCUMENT_TITLE_PAINTING]: "Titre de la page peintures",
  [META.DESCRIPTION_PAINTING]: "Description de la page peintures",

  [META.DOCUMENT_TITLE_SCULPTURE_HOME]:
    "Titre de la page d'accueil des sculptures",
  [META.DESCRIPTION_SCULPTURE_HOME]:
    "Description de la page d'accueil des sculptures",
  [META.DOCUMENT_TITLE_SCULPTURE]: "Titre de la page sculptures",
  [META.DESCRIPTION_SCULPTURE]: "Description de la page sculptures",

  [META.DOCUMENT_TITLE_DRAWING_HOME]: "Titre de la page d'accueil des dessins",
  [META.DESCRIPTION_DRAWING_HOME]:
    "Description de la page d'accueil des dessins",
  [META.DOCUMENT_TITLE_DRAWING]: "Titre de la page dessins",
  [META.DESCRIPTION_DRAWING]: "Description de la page dessins",

  [META.DOCUMENT_TITLE_POST]: "Titre de la page posts",
  [META.DESCRIPTION_POST]: "Description de la page posts",

  [META.DOCUMENT_TITLE_PRESENTATION]: "Titre de la page présentation",
  [META.DESCRIPTION_PRESENTATION]: "Description de la page présentation",

  [META.DOCUMENT_TITLE_CONTACT]: "Titre de la page contact",
  [META.DESCRIPTION_CONTACT]: "Description de la page contact",
};
