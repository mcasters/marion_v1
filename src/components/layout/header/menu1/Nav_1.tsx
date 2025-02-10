"use client";

import { MENU_1_ITEMS } from "@/constants/specific/routes";
import s from "@/styles/Nav_1.module.css";
import { useTheme } from "@/app/context/themeProvider";
import NavItem from "@/components/layout/header/menu1/NavItem";

interface Props {
  navLayout: string;
}

export default function Nav_1({ navLayout }: Props) {
  const theme = useTheme();

  return (
    <>
      <nav className={`${s[navLayout]} ${navLayout}`}>
        <ul className={s.ul}>
          {Object.entries(MENU_1_ITEMS).map((item) => {
            const tag = item[0];
            return (
              <li key={tag}>
                <NavItem itemTag={tag} navLayout={navLayout} />
              </li>
            );
          })}
        </ul>
      </nav>
      <style jsx>{`
        .itemNav {
          background-color: ${theme.menu1ItemColor};
        }
        .nav {
          background-color: ${theme.menu1Color};
        }
        .homeNavFix {
          background-color: ${theme.menu1HomeColor};
        }
      `}</style>
    </>
  );
}
