"use client";

import React, { ReactNode } from "react";
import { usePathname } from "next/navigation";

import { BASE_PATH } from "@/constants/routes";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import s from "@/styles/Layout.module.css";
import { useTheme } from "@/app/context/themeProvider";
import { hexToRgb } from "@/utils/commonUtils";
import { Category } from "@/lib/db/item";

interface Props {
  introduction: string;
  paintingCategories: Category[];
  sculptureCategories: Category[];
  children: ReactNode;
}

export default function Layout({
  introduction,
  paintingCategories,
  sculptureCategories,
  children,
}: Props) {
  const theme = useTheme();
  const pathname = usePathname();
  const basePath = pathname.split("/")[1];
  const isHome = basePath === BASE_PATH.HOME;
  const isPainting = basePath === "peintures";
  const isSculpture = basePath === "sculptures";
  const isAdmin = basePath === "admin";

  const gradientRgbObject = hexToRgb(theme.menu1HomeColor);
  const gradientRgb = `${gradientRgbObject?.r},${gradientRgbObject?.g},${gradientRgbObject?.b}`;

  return (
    <div
      className={
        isPainting || isSculpture
          ? `${s.itemWrapper} itemWrapper`
          : `${s.wrapper} wrapper`
      }
    >
      <div className={`${s.line} line`}></div>
      {isHome && <div className={`${s.gradient} gradient`}></div>}
      {isAdmin && (
        <>
          {children}
          <Footer />
        </>
      )}
      {!isAdmin && (
        <>
          <Header
            basePath={basePath}
            introduction={introduction}
            paintingCategories={paintingCategories}
            sculptureCategories={sculptureCategories}
          />
          <Main isHome={isHome}>{children}</Main>
          <Footer />
        </>
      )}
      <style jsx global>{`
        .line {
          background-color: ${theme.lineColor};
        }
        .wrapper {
          background-color: ${theme.backgroundColor};
          color: ${theme.color};
        }
        .gradient {
          background: linear-gradient(
            to top,
            rgba(${gradientRgb}, 0) 0%,
            rgba(${gradientRgb}, 0.013) 8.1%,
            rgba(${gradientRgb}, 0.049) 15.5%,
            rgba(${gradientRgb}, 0.104) 22.5%,
            rgba(${gradientRgb}, 0.175) 29%,
            rgba(${gradientRgb}, 0.259) 35.3%,
            rgba(${gradientRgb}, 0.352) 41.2%,
            rgba(${gradientRgb}, 0.45) 47.1%,
            rgba(${gradientRgb}, 0.55) 52.9%,
            rgba(${gradientRgb}, 0.648) 58.8%,
            rgba(${gradientRgb}, 0.741) 64.7%,
            rgba(${gradientRgb}, 0.825) 71%,
            rgba(${gradientRgb}, 0.896) 77.5%,
            rgba(${gradientRgb}, 0.951) 84.5%,
            rgba(${gradientRgb}, 0.987) 91.9%,
            rgb(${gradientRgb}) 100%
          );
        }
        .wrapper a,
        .wrapper .buttonLink {
          color: ${theme.linkColor};
        }
        .wrapper .icon {
          fill: ${theme.linkColor};
        }
        .wrapper a:hover,
        .wrapper a:focus,
        .wrapper .buttonLink:hover,
        .wrapper .buttonLink:focus {
          color: ${theme.linkHoverColor};
        }
        .wrapper .icon:hover,
        .wrapper .icon:focus {
          fill: ${theme.linkHoverColor};
        }
        .itemWrapper {
          background-color: ${theme.backgroundColorItem};
          color: ${theme.colorItem};
        }
        .itemWrapper a,
        .itemWrapper .buttonLink {
          color: ${theme.linkItemColor};
        }
        .itemWrapper .icon {
          fill: ${theme.linkItemColor};
        }
        .itemWrapper a:hover,
        .itemWrapper a:focus,
        .itemWrapper .buttonLink:hover,
        .itemWrapper .buttonLink:focus {
          color: ${theme.linkHoverItemColor};
        }
        .itemWrapper .icon:hover,
        .itemWrapper .icon:focus {
          fill: ${theme.linkHoverItemColor};
        }
      `}</style>
    </div>
  );
}
