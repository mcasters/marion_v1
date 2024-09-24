export const ROUTES = {
  PRESENTATION: "/presentation",
  PAINTING: "/peintures",
  SCULPTURE: "/sculptures",
  DRAWING: "/dessins",
  CONTACT: "/contact",
  HOME: "/",
  POST: "/posts",
  ADMIN: "/admin",
  A_PAINTING: "/admin/peintures",
  A_SCULPTURE: "/admin/sculptures",
  A_DRAWING: "/admin/dessins",
  A_HOME: "/admin/home",
  A_POST: "/admin/posts",
  A_CONTACT: "/admin/contact",
  A_PRESENTATION: "/admin/presentation",
};

export const BASE_PATH = {
  PRESENTATION: "presentation",
  PAINTING: "peintures",
  SCULPTURE: "sculptures",
  DRAWING: "dessins",
  CONTACT: "contact",
  HOME: "",
  POST: "posts",
  ADMIN: "admin",
};

export const NAMES = {
  PRESENTATION: "Présentation",
  PAINTING: "Peintures",
  SCULPTURE: "Sculptures",
  DRAWING: "Dessins",
  HOME: "Home",
  PRIVACY_FRENCH: "Politique de confidentialité",
  ADMIN: "Général",
  POST: "Posts",
  CONTACT: "Contact",
};

export const MENU_1 = [
  {
    BASE_PATH: BASE_PATH.PAINTING,
    NAME: NAMES.PAINTING,
  },
  {
    BASE_PATH: BASE_PATH.SCULPTURE,
    NAME: NAMES.SCULPTURE,
  },
  {
    BASE_PATH: BASE_PATH.DRAWING,
    NAME: NAMES.DRAWING,
  },
];

export const MENU_1_ITEMS = {
  [NAMES.PAINTING]: {
    NAME: NAMES.PAINTING,
    BASE_PATH: BASE_PATH.PAINTING,
  },
  [NAMES.SCULPTURE]: {
    NAME: NAMES.SCULPTURE,
    BASE_PATH: BASE_PATH.SCULPTURE,
  },
  [NAMES.DRAWING]: {
    NAME: NAMES.DRAWING,
    BASE_PATH: BASE_PATH.DRAWING,
  },
};

export const MENU_2 = [
  {
    PATH: ROUTES.PRESENTATION,
    NAME: NAMES.PRESENTATION,
  },
  {
    PATH: ROUTES.HOME,
    NAME: NAMES.HOME,
  },
  {
    PATH: ROUTES.CONTACT,
    NAME: NAMES.CONTACT,
  },
];

export const ADMIN_MENU = [
  {
    PATH: ROUTES.ADMIN,
    NAME: NAMES.ADMIN,
  },
  {
    PATH: ROUTES.A_HOME,
    NAME: NAMES.HOME,
  },
  {
    PATH: ROUTES.A_PAINTING,
    NAME: NAMES.PAINTING,
  },
  {
    PATH: ROUTES.A_SCULPTURE,
    NAME: NAMES.SCULPTURE,
  },
  {
    PATH: ROUTES.A_DRAWING,
    NAME: NAMES.DRAWING,
  },
  {
    PATH: ROUTES.A_PRESENTATION,
    NAME: NAMES.PRESENTATION,
  },
  {
    PATH: ROUTES.A_CONTACT,
    NAME: NAMES.CONTACT,
  },
];
