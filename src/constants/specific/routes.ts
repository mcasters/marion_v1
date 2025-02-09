export const ROUTES = {
  PRESENTATION: "/presentation",
  PAINTING: "/peintures",
  SCULPTURE: "/sculptures",
  DRAWING: "/dessins",
  CONTACT: "/contact",
  HOME: "/",
  POST: "/posts",
  ADMIN: "/admin",
  LOGIN: "/login",
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

export const TAGS = {
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
    TAG: TAGS.PAINTING,
  },
  {
    BASE_PATH: BASE_PATH.SCULPTURE,
    TAG: TAGS.SCULPTURE,
  },
  {
    BASE_PATH: BASE_PATH.DRAWING,
    TAG: TAGS.DRAWING,
  },
];

export const MENU_1_ITEMS = {
  [TAGS.PAINTING]: {
    TAG: TAGS.PAINTING,
    BASE_PATH: BASE_PATH.PAINTING,
  },
  [TAGS.SCULPTURE]: {
    TAG: TAGS.SCULPTURE,
    BASE_PATH: BASE_PATH.SCULPTURE,
  },
  [TAGS.DRAWING]: {
    TAG: TAGS.DRAWING,
    BASE_PATH: BASE_PATH.DRAWING,
  },
};

export const MENU_2 = [
  {
    PATH: ROUTES.PRESENTATION,
    TAG: TAGS.PRESENTATION,
  },
  {
    PATH: ROUTES.HOME,
    TAG: TAGS.HOME,
  },
  {
    PATH: ROUTES.CONTACT,
    TAG: TAGS.CONTACT,
  },
];

export const ADMIN_MENU = [
  {
    PATH: ROUTES.ADMIN,
    TAG: TAGS.ADMIN,
  },
  {
    PATH: ROUTES.A_HOME,
    TAG: TAGS.HOME,
  },
  {
    PATH: ROUTES.A_PAINTING,
    TAG: TAGS.PAINTING,
  },
  {
    PATH: ROUTES.A_SCULPTURE,
    TAG: TAGS.SCULPTURE,
  },
  {
    PATH: ROUTES.A_DRAWING,
    TAG: TAGS.DRAWING,
  },
  {
    PATH: ROUTES.A_PRESENTATION,
    TAG: TAGS.PRESENTATION,
  },
  {
    PATH: ROUTES.A_CONTACT,
    TAG: TAGS.CONTACT,
  },
];
