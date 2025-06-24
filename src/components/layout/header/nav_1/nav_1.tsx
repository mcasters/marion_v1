"use client";

import { MENU_1_ITEMS } from "@/constants/specific/routes";
import s from "@/components/layout/header/nav_1/nav_1.module.css";
import { useTheme } from "@/app/context/themeProvider";

import { getBorderColor } from "@/utils/themeUtils";
import { usePathname } from "next/navigation";
import Link from "next/link";
import React from "react";

type Props = {
  navLayout: string;
};

export default function Nav_1({ navLayout }: Props) {
  const theme = useTheme();
  const path = `/${usePathname().split("/")[1]}`;

  return (
    <nav className={`${s[navLayout]} ${navLayout} nav1`}>
      <ul className={`${s.ul} ul`}>
        {MENU_1_ITEMS.map((item) => {
          return (
            <li key={item.TAG}>
              <Link
                href={item.ROUTE}
                className={
                  item.ROUTE === path
                    ? `${s.link} ${s.active} link active`
                    : `${s.link} link`
                }
              >
                {item.TAG}
              </Link>
            </li>
          );
        })}
      </ul>
      <style jsx>{`
        .itemNav {
          background-color: ${theme.item.menu1.background};
          border-bottom: 1px solid
            ${getBorderColor(theme.item.menu1.background)};
        }
        .nav {
          background-color: ${theme.other.menu1.background};
          border-bottom: 1px solid
            ${getBorderColor(theme.other.menu1.background)};
        }
        .homeNavFix {
          background-color: ${theme.home.menu1.background};
          border-bottom: 1px solid
            ${getBorderColor(theme.home.menu1.background)};
        }
        .homeNav .ul {
          border-bottom: 1px solid
            ${getBorderColor(theme.home.menu1.background)};
        }
      `}</style>
    </nav>
  );
}
