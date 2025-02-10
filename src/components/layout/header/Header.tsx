"use client";

import LAYOUT from "@/constants/layout";
import Nav_1 from "@/components/layout/header/menu1/Nav_1";
import Nav_2 from "@/components/layout/header/Nav_2";
import s from "../../../styles/Header.module.css";
import { ROUTES } from "@/constants/specific/routes";
import { useTheme } from "@/app/context/themeProvider";
import React, { useState } from "react";
import HomeSection from "@/components/layout/header/HomeSection";

interface Props {
  path: string | null;
  introduction?: string;
}

export default function Header({ path, introduction }: Props) {
  const theme = useTheme();
  const isHome = path == ROUTES.HOME;
  const isPainting = path === ROUTES.PAINTING;
  const isSculpture = path === ROUTES.SCULPTURE;
  const isDrawing = path === ROUTES.DRAWING;
  const [titleIsGone, setTitleIsGone] = useState<boolean>(false);
  const [introIsGone, setIntroIsGone] = useState<boolean>(false);

  return (
    <header className={s.header}>
      {isHome && (
        <HomeSection
          handleDisappear={setTitleIsGone}
          yLimit={LAYOUT.LINE_HEIGHT}
        />
      )}
      <Nav_1
        navLayout={
          isSculpture || isPainting || isDrawing
            ? LAYOUT.ITEM_NAV
            : isHome && !titleIsGone
              ? LAYOUT.HOME_NAV
              : isHome && titleIsGone
                ? LAYOUT.HOME_NAV_FIX
                : LAYOUT.NAV
        }
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
          isSculpture || isPainting || isDrawing
            ? LAYOUT.ITEM_NAV
            : isHome && !introIsGone
              ? LAYOUT.HOME_NAV
              : isHome && introIsGone
                ? LAYOUT.HOME_NAV_FIX
                : LAYOUT.NAV
        }
      />
      <div
        style={{
          display: introIsGone ? "block" : "none",
          height: LAYOUT.NAV_2_HEIGHT,
        }}
      />
      <style jsx>{`
        .title {
          color: ${theme.titleColor};
        }
      `}</style>
    </header>
  );
}
