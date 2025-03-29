"use client";

import { MENU_1_ITEMS } from "@/constants/specific/routes";
import s from "@/components/layout/header/nav_1/nav_1.module.css";
import { useTheme } from "@/app/context/themeProvider";
import NavItem from "@/components/layout/header/nav_1/navItem";

import { getBorderColor } from "@/utils/themeUtils";

type Props = {
  navLayout: string;
};

export default function Nav_1({ navLayout }: Props) {
  const theme = useTheme();

  return (
    <nav className={`${s[navLayout]} ${navLayout}`}>
      <ul className={`${s.ul} ul`}>
        {Object.entries(MENU_1_ITEMS).map((item) => {
          const tag = item[0];
          return (
            <li key={tag}>
              <NavItem itemTag={tag} navLayout={navLayout} />
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
