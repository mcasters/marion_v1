"use client";

import { MENU_1, NAMES } from "@/constants/routes";
import s from "@/styles/Nav_1.module.css";
import { useTheme } from "@/app/context/themeProvider";
import LAYOUT from "@/constants/layout";
import { Category } from "@/lib/db/item";
import NavItem from "@/components/layout/menu1/NavItem";

interface Props {
  navLayout: string;
  basePath: string;
  paintingCategories: Category[];
  sculptureCategories: Category[];
}

export default function Nav_1({
  navLayout,
  basePath,
  paintingCategories,
  sculptureCategories,
}: Props) {
  const theme = useTheme();
  return (
    <>
      <nav
        className={
          navLayout === LAYOUT.ITEM_NAV
            ? `${s.itemNav} itemNav`
            : navLayout === LAYOUT.HOME_NAV
              ? `${s.homeNav} homeNav`
              : navLayout === LAYOUT.HOME_NAV_FIX
                ? `${s.homeNavFix} homeNavFix ${s.homeNav} homeNav`
                : `${s.nav} nav`
        }
      >
        <ul className={s.ul}>
          {MENU_1.map((item) => {
            const name = item.NAME;

            return (
              <li key={name}>
                <NavItem
                  itemName={name}
                  navLayout={navLayout}
                  basePath={basePath}
                  categories={
                    name === NAMES.SCULPTURE
                      ? sculptureCategories
                      : name === NAMES.PAINTING
                        ? paintingCategories
                        : []
                  }
                />
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
