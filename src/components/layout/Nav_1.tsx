"use client";

import Link from "next/link";

import { PaintingCategory, SculptureCategory } from "@prisma/client";
import { BASE_PATH, MENU_1 } from "@/constants/routes";
import Dropdown from "@/components/layout/DropDown";
import s from "@/styles/Nav_1.module.css";
import { useTheme } from "@/app/context/themeProvider";
import LAYOUT from "@/constants/layout";

interface Props {
  navType: string;
  basePath: string;
  paintingCategories: PaintingCategory[];
  sculptureCategories: SculptureCategory[];
}

export default function Nav_1({
  navType,
  basePath,
  paintingCategories,
  sculptureCategories,
}: Props) {
  const theme = useTheme();

  return (
    <>
      <nav
        className={
          navType === LAYOUT.ITEM_NAV
            ? `${s.itemNav} itemNav`
            : navType === LAYOUT.HOME_NAV
            ? `${s.homeNav} homeNav`
            : navType === LAYOUT.HOME_NAV_FIX
            ? `${s.homeNavFix} homeNavFix ${s.homeNav} homeNav`
            : `${s.nav} nav`
        }
      >
        <ul className={s.menu}>
          {MENU_1.map((menuItem) => {
            if (
              menuItem.BASE_PATH === BASE_PATH.PAINTING &&
              paintingCategories.length > 0
            ) {
              return (
                <Dropdown
                  key={menuItem.NAME}
                  menuItems={paintingCategories}
                  path={`/${menuItem.BASE_PATH}`}
                  name={menuItem.NAME}
                  isActive={basePath === BASE_PATH.PAINTING}
                  navType={navType}
                />
              );
            } else if (
              menuItem.BASE_PATH === BASE_PATH.SCULPTURE &&
              sculptureCategories.length > 0
            ) {
              return (
                <Dropdown
                  key={menuItem.NAME}
                  menuItems={sculptureCategories}
                  path={`/${menuItem.BASE_PATH}`}
                  name={menuItem.NAME}
                  isActive={basePath === BASE_PATH.SCULPTURE}
                  navType={navType}
                />
              );
            }
            const isActive = basePath === menuItem.BASE_PATH;
            return (
              <li key={menuItem.NAME}>
                <Link
                  href={`/${menuItem.BASE_PATH}`}
                  key={menuItem.NAME}
                  legacyBehavior={true}
                >
                  <a
                    className={
                      isActive ? `${s.link} ${s.active} link` : `${s.link} link`
                    }
                  >
                    {menuItem.NAME}
                  </a>
                </Link>
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
        .homeNav .link {
          color: ${theme.menu1LinkHomeColor};
        }
        .nav .link {
          color: ${theme.menu1LinkColor};
        }
        .itemNav .link {
          color: ${theme.menu1LinkItemColor};
        }
        .homeNav .link:hover {
          color: ${theme.menu1LinkHomeHoverColor};
        }
        .nav .link:hover {
          color: ${theme.menu1LinkHoverColor};
        }
        .itemNav .link:hover {
          color: ${theme.menu1LinkHoverItemColor};
        }
        .nav .link.active {
          border-bottom-color: ${theme.menu2LinkColor};
        }
        .itemNav .link.active {
         border-bottom-color: ${theme.menu2LinkItemColor};
        }
      `}</style>
    </>
  );
}
