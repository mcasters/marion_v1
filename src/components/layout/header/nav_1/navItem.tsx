"use client";

import Link from "next/link";
import { MENU_1_ITEMS } from "@/constants/specific/routes";
import s from "./navItem.module.css";
import { useTheme } from "@/app/context/themeProvider";
import React, { useMemo } from "react";
import LAYOUT from "@/constants/layout";
import { usePathname } from "next/navigation";
import { useMetas } from "@/app/context/metaProvider";
import { META } from "@/constants/admin";

type Props = {
  itemTag: string;
  navLayout: string;
};

export default function NavItem({ itemTag, navLayout }: Props) {
  const theme = useTheme();
  const metas = useMetas();
  const item = MENU_1_ITEMS[itemTag];
  const path = `/${usePathname().split("/")[1]}`;
  const isActive = item.ROUTE === path;

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
    return metas.get(META.SITE_TITLE)?.startsWith("M")
      ? theme.menu2LinkItemColor
      : navLayout === LAYOUT.ITEM_NAV
        ? theme.menu1LinkItemColor
        : theme.menu2LinkItemColor;
  }, [theme, navLayout]);

  return (
    <>
      <Link href={item.ROUTE} legacyBehavior>
        <a
          className={
            isActive ? `${s.link} ${s.active} link active` : `${s.link} link`
          }
        >
          {item.TAG}
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
