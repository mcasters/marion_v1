import { ThemeEnhanced, ThemePagePart, ThemeTarget } from "@/lib/type";

export const THEME = {
  BASE_THEME: "Thème de base",
};

export const PAGE_TYPE = {
  GENERAL: "Général",
  ITEM: "Pages d'items",
  OTHERS: "Autres pages",
  HOME: "Page home",
};

export const THEME_LABEL: {
  [key in ThemeTarget | ThemePagePart | ThemeEnhanced]: string;
} = {
  lineColor: "Ligne au top",
  titleColor: "Titre du site",
  menu1: "Menu 1",
  menu2: "Menu 2",
  main: "Corps",
  footer: "Pied de page",
  background: "Fond",
  text: "Texte",
  link: "Lien",
  linkHover: "Lien pointé",
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
