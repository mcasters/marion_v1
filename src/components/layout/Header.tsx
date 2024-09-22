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

interface Props {
  basePath: string;
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
  const { isUpTo: titleDisappear, ref: titleRef } = useElementIsUpTo(
    LAYOUT.LINE_HEIGHT,
  );
  const { isUpTo: introDisappear, ref: introRef } = useElementIsUpTo(
    LAYOUT.NAV_1_HEIGHT + LAYOUT.LINE_HEIGHT,
  );
  const isHome = basePath === BASE_PATH.HOME;
  const isPainting = basePath === BASE_PATH.PAINTING;
  const isSculpture = basePath === BASE_PATH.SCULPTURE;

  const navType1 =
    isSculpture || isPainting
      ? LAYOUT.ITEM_NAV
      : isHome && !titleDisappear
        ? LAYOUT.HOME_NAV
        : isHome && titleDisappear
          ? LAYOUT.HOME_NAV_FIX
          : LAYOUT.NAV;

  const navType2 =
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
        <div ref={titleRef} className={s.siteTitle}>
          <h1 className={`${s.title} title`}>{GENERAL.SITE_TITLE}</h1>
        </div>
      )}
      <Nav_1
        navLayout={navType1}
        basePath={basePath}
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
        <div ref={introRef} className={s.intro}>
          <p>{introduction}</p>
        </div>
      )}
      <Nav_2 navType={navType2} />
      <style jsx>{`
        .title {
          color: ${theme.titleColor};
        }
      `}</style>
    </header>
  );
}
