"use client";

import { MENU_1, TAGS } from "@/constants/specific/routes";
import s from "@/styles/Nav_1.module.css";
import { useTheme } from "@/app/context/themeProvider";
import { CategoryFull } from "@/lib/type";
import NavItem from "@/components/layout/header/menu1/NavItem";

interface Props {
  navLayout: string;
  paintingCategories: CategoryFull[];
  sculptureCategories: CategoryFull[];
  drawingCategories?: CategoryFull[];
}

export default function Nav_1({
  navLayout,
  paintingCategories,
  sculptureCategories,
  drawingCategories,
}: Props) {
  const theme = useTheme();

  return (
    <>
      <nav className={`${s[navLayout]} ${navLayout}`}>
        <ul className={s.ul}>
          {MENU_1.map((item) => {
            const tag = item.TAG;

            return (
              <li key={tag}>
                <NavItem
                  itemTag={tag}
                  navLayout={navLayout}
                  categories={
                    tag === TAGS.SCULPTURE
                      ? sculptureCategories
                      : tag === TAGS.PAINTING
                        ? paintingCategories
                        : tag === TAGS.DRAWING && drawingCategories
                          ? drawingCategories
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
