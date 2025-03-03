import { THEME } from "../admin";

export const META = {
  SITE_TITLE: "siteTitle",
  SITE_EMAIL: "siteEmail",
  FOOTER: "footerContent",
  INSTAGRAM: "instagram",
  SEO_SITE_TITLE: "seoSiteTitle",
  URL: "url",
  KEYWORDS: "keywords",
  DESCRIPTION_PAINTING: "descriptionPainting",
  DESCRIPTION_SCULPTURE: "descriptionSculpture",
  DESCRIPTION_DRAWING: "descriptionDrawing",
  DESCRIPTION_POST: "descriptionPost",
  DESCRIPTION_HOME: "descriptionHome",
  DESCRIPTION_PRESENTATION: "descriptionPresentation",
  DESCRIPTION_CONTACT: "descriptionContact",
  DOCUMENT_TITLE_PAINTING: "documentTitlePainting",
  DOCUMENT_TITLE_SCULPTURE: "documentTitleSculpture",
  DOCUMENT_TITLE_DRAWING: "documentTitleDrawing",
  DOCUMENT_TITLE_POST: "documentTitlePost",
  DOCUMENT_TITLE_HOME: "documentTitleHome",
  DOCUMENT_TITLE_PRESENTATION: "documentTitlePresentation",
  DOCUMENT_TITLE_CONTACT: "documentTitleContact",
  DOCUMENT_TITLE_AUTHENTICATION: "documentTitleAuthentication",
};

export const SEO = {
  [META.SEO_SITE_TITLE]: "Titre du site",
  [META.URL]: "Url du site",
  [META.KEYWORDS]: "Mots clés",
  [META.DOCUMENT_TITLE_HOME]: "Titre de la page home",
  [META.DESCRIPTION_HOME]: "Description de la page home",
  [META.DOCUMENT_TITLE_PAINTING]: "Titre de la page peintures",
  [META.DESCRIPTION_PAINTING]: "Description de la page peintures",
  [META.DOCUMENT_TITLE_DRAWING]: "Titre de la page dessins",
  [META.DESCRIPTION_DRAWING]: "Description de la page dessins",
  [META.DOCUMENT_TITLE_SCULPTURE]: "Titre de la page sculptures",
  [META.DESCRIPTION_SCULPTURE]: "Description de la page sculptures",
  [META.DOCUMENT_TITLE_POST]: "Titre de la page posts",
  [META.DESCRIPTION_POST]: "Description de la page posts",
  [META.DOCUMENT_TITLE_PRESENTATION]: "Titre de la page présentation",
  [META.DESCRIPTION_PRESENTATION]: "Description de la page présentation",
  [META.DOCUMENT_TITLE_CONTACT]: "Titre de la page contact",
  [META.DESCRIPTION_CONTACT]: "Description de la page contact",
  [META.DOCUMENT_TITLE_AUTHENTICATION]: "Titre de la page authentification",
};

export const BASE_THEME = {
  name: THEME.BASE_THEME,
  isActive: true,

  // general
  lineColor: "#be2d01",
  backgroundColor: "#fafafa",
  titleColor: "#333",
  color: "#333",
  linkColor: "#be2d01",
  linkHoverColor: "#ee7845",

  // item
  backgroundColorItem: "#fafafa",
  colorItem: "#333",
  linkItemColor: "#be2d01",
  linkHoverItemColor: "#ee7845",

  /*
   menu 1
   */
  // general
  menu1Color: "#e7e7e7",
  menu1LinkColor: "#333",
  menu1LinkHoverColor: "#be2d01",

  // home
  menu1HomeColor: "#e7e7e7",
  menu1LinkHomeColor: "#333",
  menu1LinkHomeHoverColor: "#be2d01",

  // item
  menu1ItemColor: "#e7e7e7",
  menu1LinkItemColor: "#333",
  menu1LinkHoverItemColor: "#be2d01",

  /*
   menu 2
   */
  // general
  menu2Color: "#fafafa",
  menu2LinkColor: "#be2d01",
  menu2LinkHoverColor: "#333",

  // home
  menu2HomeColor: "#fafafa",
  menu2LinkHomeColor: "#be2d01",
  menu2LinkHomeHoverColor: "#333",

  // item
  menu2ItemColor: "#fafafa",
  menu2LinkItemColor: "#be2d01",
  menu2LinkHoverItemColor: "#333",
};

export const BASE_PRESET_COLOR = {
  name: "Red",
  color: "#be2d01",
};
