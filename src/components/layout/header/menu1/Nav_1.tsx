"use client";

import { MENU_1_ITEMS } from "@/constants/specific/routes";
import s from "@/styles/nav_1.module.css";
import { useTheme } from "@/app/context/themeProvider";
import NavItem from "@/components/layout/header/menu1/NavItem";
import { getBorderColor } from "@/utils/commonUtils";

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
          background-color: ${theme.menu1ItemColor};
          border-bottom: 1px solid ${getBorderColor(theme.menu1ItemColor)};
        }
        .nav {
          background-color: ${theme.menu1Color};
          border-bottom: 1px solid ${getBorderColor(theme.menu1Color)};
        }
        .homeNavFix {
          background-color: ${theme.menu1HomeColor};
          border-bottom: 1px solid ${getBorderColor(theme.menu1HomeColor)};
        }
        .homeNav .ul {
          border-bottom: 1px solid ${getBorderColor(theme.menu1HomeColor)};
        }
      `}</style>
    </nav>
  );
}
