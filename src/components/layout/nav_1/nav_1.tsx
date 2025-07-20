"use client";

import { MENU_1_ITEMS } from "@/constants/specific/routes.ts";
import s from "@/components/layout/nav_1/nav_1.module.css";
import { useTheme } from "@/app/context/themeProvider.tsx";

import { getDarkerColor } from "@/lib/utils/themeUtils.ts";
import { usePathname } from "next/navigation";
import Link from "next/link";
import React from "react";

type Props = {
  navClass: string;
};

export default function Nav_1({ navClass }: Props) {
  const theme = useTheme();
  const path = `/${usePathname().split("/")[1]}`;

  return (
    <nav className={`${s[navClass]} ${navClass} nav1`}>
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
            ${getDarkerColor(theme.item.menu1.background, -10)};
        }
        .nav {
          background-color: ${theme.other.menu1.background};
          border-bottom: 1px solid
            ${getDarkerColor(theme.other.menu1.background, -10)};
        }
        .homeNavFix {
          background-color: ${theme.home.menu1.background};
          border-bottom: 1px solid
            ${getDarkerColor(theme.home.menu1.background, -10)};
        }
        .homeNav .ul {
          border-bottom: 1px solid
            ${getDarkerColor(theme.home.menu1.background, -10)};
        }
      `}</style>
    </nav>
  );
}
