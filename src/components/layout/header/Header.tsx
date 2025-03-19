"use client";

import LAYOUT from "@/constants/layout";
import Nav_1 from "@/components/layout/header/nav_1/Nav_1";
import Nav_2 from "@/components/layout/header/nav_2/Nav_2";
import s from "./header.module.css";
import { ROUTES } from "@/constants/specific/routes";
import React, { useState } from "react";
import HomeSection from "@/components/layout/header/HomeSection";

type Props = {
  path: string;
  introduction?: string;
};

export default function Header({ path, introduction }: Props) {
  const isHome = path == ROUTES.HOME;
  const isPainting = path === ROUTES.PAINTING;
  const isSculpture = path === ROUTES.SCULPTURE;
  const isDrawing = path === ROUTES.DRAWING;
  const [titleIsGone, setTitleIsGone] = useState<boolean>(false);
  const [introIsGone, setIntroIsGone] = useState<boolean>(false);

  if (isHome)
    return (
      <header className={s.header}>
        <HomeSection
          handleDisappear={setTitleIsGone}
          yLimit={LAYOUT.LINE_HEIGHT}
        />
        <Nav_1
          navLayout={titleIsGone ? LAYOUT.HOME_NAV_FIX : LAYOUT.HOME_NAV}
        />
        <div
          style={{
            display: titleIsGone ? "block" : "none",
            height: LAYOUT.NAV_1_HEIGHT,
          }}
        />
        <HomeSection
          handleDisappear={setIntroIsGone}
          yLimit={LAYOUT.NAV_1_HEIGHT + LAYOUT.LINE_HEIGHT}
          text={introduction}
        />
        <Nav_2
          navLayout={introIsGone ? LAYOUT.HOME_NAV_FIX : LAYOUT.HOME_NAV}
        />
        <div
          style={{
            display: introIsGone ? "block" : "none",
            height: LAYOUT.NAV_2_HEIGHT,
          }}
        />
      </header>
    );
  else
    return (
      <header className={s.header}>
        <Nav_1
          navLayout={
            isSculpture || isPainting || isDrawing
              ? LAYOUT.ITEM_NAV
              : LAYOUT.NAV
          }
        />
        <Nav_2
          navLayout={
            isSculpture || isPainting || isDrawing
              ? LAYOUT.ITEM_NAV
              : LAYOUT.NAV
          }
        />
      </header>
    );
}
