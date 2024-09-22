"use client";

import Link from "next/link";
import { MENU_1_ITEMS } from "@/constants/routes";
import Dropdown from "@/components/layout/menu1/DropDown";
import s from "./NavItem.module.css";
import { useTheme } from "@/app/context/themeProvider";
import { Category } from "@/lib/db/item";
import React, { useMemo } from "react";
import LAYOUT from "@/constants/layout";

interface Props {
  itemName: string;
  navLayout: string;
  basePath: string;
  categories: Category[];
}

export default function NavItem({
  itemName,
  navLayout,
  basePath,
  categories,
}: Props) {
  const theme = useTheme();
  const item = MENU_1_ITEMS[itemName];
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

  if (categories.length > 0)
    return (
      <Dropdown
        key={item}
        menuItems={categories}
        path={`/${item.BASE_PATH}`}
        name={item.NAME}
        isActive={isActive}
        themeLink={themeLink}
        themeLinkHover={themeLinkHover}
        themeBorderActive={theme.menu2LinkItemColor}
      />
    );

  return (
    <>
      <Link href={`/${item.BASE_PATH}`} key={item.NAME} legacyBehavior={true}>
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
          border-bottom-color: ${theme.menu2LinkItemColor};
        }
      `}</style>
    </>
  );
}
