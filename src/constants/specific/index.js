import { THEME, THEME_PROPS } from "../admin";

export const BASE_THEME = {
  name: THEME.BASE_THEME,
  isActive: true,

  // general
  [THEME_PROPS.LINE_COLOR]: "#be2d01",
  [THEME_PROPS.BD_COLOR]: "#fafafa",
  [THEME_PROPS.TITLE_COLOR]: "#333",
  [THEME_PROPS.COLOR]: "#333",
  [THEME_PROPS.LINK_COLOR]: "#be2d01",
  [THEME_PROPS.LINK_HOVER_COLOR]: "#ee7845",

  // item
  [THEME_PROPS.BD_COLOR_ITEM]: "#fafafa",
  [THEME_PROPS.COLOR_ITEM]: "#333",
  [THEME_PROPS.LINK_ITEM_COLOR]: "#be2d01",
  [THEME_PROPS.LINK_HOVER_ITEM_COLOR]: "#ee7845",

  /*
   menu 1
   */
  // general
  [THEME_PROPS.MENU_1_COLOR]: "#e7e7e7",
  [THEME_PROPS.MENU_1_LINK_COLOR]: "#333",
  [THEME_PROPS.MENU_1_LINK_HOVER_COLOR]: "#be2d01",

  // home
  [THEME_PROPS.MENU_1_HOME_COLOR]: "#e7e7e7",
  [THEME_PROPS.MENU_1_LINK_HOME_COLOR]: "#333",
  [THEME_PROPS.MENU_1_LINK_HOVER_HOME_COLOR]: "#be2d01",

  // item
  [THEME_PROPS.MENU_1_ITEM_COLOR]: "#e7e7e7",
  [THEME_PROPS.MENU_1_LINK_ITEM_COLOR]: "#333",
  [THEME_PROPS.MENU_1_LINK_HOVER_ITEM_COLOR]: "#be2d01",

  /*
   menu 2
   */
  // general
  [THEME_PROPS.MENU_2_COLOR]: "#fafafa",
  [THEME_PROPS.MENU_2_LINK_COLOR]: "#be2d01",
  [THEME_PROPS.MENU_2_LINK_HOVER_COLOR]: "#333",

  // home
  [THEME_PROPS.MENU_2_HOME_COLOR]: "#fafafa",
  [THEME_PROPS.MENU_2_LINK_HOME_COLOR]: "#be2d01",
  [THEME_PROPS.MENU_2_LINK_HOVER_HOME_COLOR]: "#333",

  // item
  [THEME_PROPS.MENU_2_ITEM_COLOR]: "#fafafa",
  [THEME_PROPS.MENU_2_LINK_ITEM_COLOR]: "#be2d01",
  [THEME_PROPS.MENU_2_LINK_HOVER_ITEM_COLOR]: "#333",
};

export const BASE_PRESET_COLOR = {
  name: "Red",
  color: "#be2d01",
};
