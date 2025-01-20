"use client";

import Link from "next/link";
import { MENU_1_ITEMS } from "@/constants/specific/routes";
import Dropdown from "@/components/layout/header/menu1/DropDown";
import s from "./NavItem.module.css";
import { useTheme } from "@/app/context/themeProvider";
import { CategoryFull } from "@/lib/db/item";
import React, { useMemo } from "react";
import LAYOUT from "@/constants/layout";
import { usePathname } from "next/navigation";
import { TEXTS } from "@/constants/specific";

interface Props {
  itemName: string;
  navLayout: string;
  categories: CategoryFull[];
}

export default function NavItem({ itemName, navLayout, categories }: Props) {
  const theme = useTheme();
  const item = MENU_1_ITEMS[itemName];
  const basePath = usePathname().split("/")[1];
  const isActive = basePath === item.BASE_PATH;

  const themeLink = useMemo(() => {
    return navLayout === LAYOUT.ITEM_NAV
      ? theme.menu1LinkItemColor
      : navLayout === LAYOUT.HOME_NAV
        ? theme.menu1LinkHomeColor
        : theme.menu1LinkColor;
  }, [theme, navLayout]);
  const themeLinkHover = useMemo(() => {
    return navLayout === LAYOUT.ITEM_NAV
      ? theme.menu1LinkHoverItemColor
      : navLayout === LAYOUT.HOME_NAV
        ? theme.menu1LinkHomeHoverColor
        : theme.menu1LinkHoverColor;
  }, [theme, navLayout]);
  const themeBorderActive = useMemo(() => {
    return TEXTS.TITLE === "Marion Casters"
      ? theme.menu2LinkItemColor
      : navLayout === LAYOUT.ITEM_NAV
        ? theme.menu1LinkItemColor
        : theme.menu2LinkItemColor;
  }, [theme, navLayout]);

  if (
    categories.length > 1 ||
    (categories.length === 1 && categories[0].value !== "Sans catégorie")
  )
    return (
      <Dropdown
        itemName={item.NAME}
        menuItems={categories}
        themeLink={themeLink}
        themeLinkHover={themeLinkHover}
        themeBorderActive={themeBorderActive}
      />
    );

  return (
    <>
      <Link href={`/${item.BASE_PATH}`} legacyBehavior>
        <a
          className={
            isActive ? `${s.link} ${s.active} link active` : `${s.link} link`
          }
        >
          {item.NAME}
        </a>
      </Link>
      <style jsx>{`
        .link {
          color: ${themeLink};
        }
        .link:hover {
          color: ${themeLinkHover};
        }
        .link.active {
          border-bottom-color: ${themeBorderActive};
        }
      `}</style>
    </>
  );
}
