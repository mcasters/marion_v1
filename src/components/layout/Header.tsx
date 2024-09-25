"use client";

import useElementIsUpTo from "@/components/hooks/useElementIsUpTo";
import LAYOUT from "@/constants/layout";
import Nav_1 from "./menu1/Nav_1";
import Nav_2 from "@/components/layout/Nav_2";
import s from "../../styles/Header.module.css";
import { GENERAL } from "@/constants";
import { BASE_PATH } from "@/constants/routes";
import { useTheme } from "@/app/context/themeProvider";
import React from "react";
import { Category } from "@/lib/db/item";
import { useSelectedLayoutSegment } from "next/navigation";

interface Props {
  introduction?: string;
  paintingCategories: Category[];
  sculptureCategories: Category[];
}
export default function Header({
  introduction,
  paintingCategories,
  sculptureCategories,
}: Props) {
  const theme = useTheme();
  const basePath = useSelectedLayoutSegment();
  const { isUpTo: titleDisappear, ref: titleRef } = useElementIsUpTo(
    LAYOUT.LINE_HEIGHT,
  );
  const { isUpTo: introDisappear, ref: introRef } = useElementIsUpTo(
    LAYOUT.NAV_1_HEIGHT + LAYOUT.LINE_HEIGHT,
  );
  const isHome = basePath == null;
  const isPainting = basePath === BASE_PATH.PAINTING;
  const isSculpture = basePath === BASE_PATH.SCULPTURE;

  const nav1Layout =
    isSculpture || isPainting
      ? LAYOUT.ITEM_NAV
      : isHome && !titleDisappear
        ? LAYOUT.HOME_NAV
        : isHome && titleDisappear
          ? LAYOUT.HOME_NAV_FIX
          : LAYOUT.NAV;

  const nav2Layout =
    isSculpture || isPainting
      ? LAYOUT.ITEM_NAV
      : isHome && !introDisappear
        ? LAYOUT.HOME_NAV
        : isHome && introDisappear
          ? LAYOUT.HOME_NAV_FIX
          : LAYOUT.NAV;

  return (
    <header className={s.container}>
      {isHome && (
        <section ref={titleRef} className={s.siteTitle}>
          <h1 className={`${s.title} title`}>{GENERAL.SITE_TITLE}</h1>
        </section>
      )}
      <Nav_1
        navLayout={nav1Layout}
        paintingCategories={paintingCategories}
        sculptureCategories={sculptureCategories}
      />
      <div
        style={{
          display: titleDisappear ? "block" : "none",
          height: LAYOUT.NAV_1_HEIGHT,
        }}
      />
      {isHome && (
        <section ref={introRef} className={s.intro}>
          <p>{introduction}</p>
        </section>
      )}
      <Nav_2 navLayout={nav2Layout} />
      <style jsx>{`
        .title {
          color: ${theme.titleColor};
        }
      `}</style>
    </header>
  );
}
