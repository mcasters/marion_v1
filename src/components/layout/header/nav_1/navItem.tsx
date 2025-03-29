"use client";

import Link from "next/link";
import { MENU_1_ITEMS } from "@/constants/specific/routes";
import s from "./navItem.module.css";
import { useTheme } from "@/app/context/themeProvider";
import React, { useMemo } from "react";
import LAYOUT from "@/constants/layout";
import { usePathname } from "next/navigation";
import { useMetas } from "@/app/context/metaProvider";

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
      ? theme.item.menu1.link
      : navLayout === LAYOUT.HOME_NAV
        ? theme.home.menu1.link
        : theme.other.menu1.link;
  }, [theme, navLayout]);
  const themeLinkHover = useMemo(() => {
    return navLayout === LAYOUT.ITEM_NAV
      ? theme.item.menu1.linkHover
      : navLayout === LAYOUT.HOME_NAV
        ? theme.home.menu1.linkHover
        : theme.other.menu1.linkHover;
  }, [theme, navLayout]);
  const themeBorderActive = useMemo(() => {
    return navLayout === LAYOUT.ITEM_NAV
      ? theme.item.menu2.link
      : navLayout === LAYOUT.HOME_NAV
        ? theme.home.menu2.link
        : theme.other.menu2.link;
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
