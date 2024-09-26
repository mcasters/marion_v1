"use client";

import LAYOUT from "@/constants/layout";
import Nav_1 from "@/components/layout/header/menu1/Nav_1";
import Nav_2 from "@/components/layout/header/Nav_2";
import s from "../../../styles/Header.module.css";
import { BASE_PATH } from "@/constants/routes";
import { useTheme } from "@/app/context/themeProvider";
import React, { useState } from "react";
import { Category } from "@/lib/db/item";
import HomeSection from "@/components/layout/header/HomeSection";

interface Props {
  basePath: string | null;
  introduction?: string;
  paintingCategories: Category[];
  sculptureCategories: Category[];
}

export default function Header({
  basePath,
  introduction,
  paintingCategories,
  sculptureCategories,
}: Props) {
  const theme = useTheme();
  const isHome = basePath == BASE_PATH.HOME;
  const isPainting = basePath === BASE_PATH.PAINTING;
  const isSculpture = basePath === BASE_PATH.SCULPTURE;
  const [titleIsGone, setTitleIsGone] = useState<boolean>(false);
  const [introIsGone, setIntroIsGone] = useState<boolean>(false);

  return (
    <header className={s.container}>
      {isHome && (
        <HomeSection
          handleDisappear={setTitleIsGone}
          yLimit={LAYOUT.LINE_HEIGHT}
        />
      )}
      <Nav_1
        navLayout={
          isSculpture || isPainting
            ? LAYOUT.ITEM_NAV
            : isHome && !titleIsGone
              ? LAYOUT.HOME_NAV
              : isHome && titleIsGone
                ? LAYOUT.HOME_NAV_FIX
                : LAYOUT.NAV
        }
        paintingCategories={paintingCategories}
        sculptureCategories={sculptureCategories}
      />
      <div
        style={{
          display: titleIsGone ? "block" : "none",
          height: LAYOUT.NAV_1_HEIGHT,
        }}
      />
      {isHome && (
        <HomeSection
          handleDisappear={setIntroIsGone}
          yLimit={LAYOUT.NAV_1_HEIGHT + LAYOUT.LINE_HEIGHT}
          text={introduction}
        />
      )}
      <Nav_2
        navLayout={
          isSculpture || isPainting
            ? LAYOUT.ITEM_NAV
            : isHome && !introIsGone
              ? LAYOUT.HOME_NAV
              : isHome && introIsGone
                ? LAYOUT.HOME_NAV_FIX
                : LAYOUT.NAV
        }
      />
      <style jsx>{`
        .title {
          color: ${theme.titleColor};
        }
      `}</style>
    </header>
  );
}
