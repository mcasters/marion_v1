"use client";

import React, { ReactNode } from "react";
import { usePathname } from "next/navigation";

import { ROUTES } from "@/constants/specific/routes";
import Header from "./header/Header";
import Main from "./Main";
import Footer from "./Footer";
import s from "@/styles/Layout.module.css";
import { useTheme } from "@/app/context/themeProvider";
import { hexToRgb } from "@/utils/commonUtils";
import AuthStatus from "@/components/auth/AuthStatus";
import { useSession } from "@/app/context/sessionProvider";

interface Props {
  introduction: string;
  children: ReactNode;
}

export default function Layout({ introduction, children }: Props) {
  const theme = useTheme();
  const path = usePathname();
  const session = useSession();

  const isHome = path === ROUTES.HOME;
  const isPainting = path === ROUTES.PAINTING;
  const isSculpture = path === ROUTES.SCULPTURE;
  const isDrawing = path === ROUTES.DRAWING;
  const isAdmin = path === ROUTES.ADMIN;

  const gradientRgbObject = hexToRgb(theme.menu1HomeColor);
  const gradientRgb = `${gradientRgbObject?.r},${gradientRgbObject?.g},${gradientRgbObject?.b}`;

  return (
    <div
      className={
        isPainting || isSculpture || isDrawing
          ? `${s.itemWrapper} itemWrapper`
          : `${s.wrapper} wrapper`
      }
    >
      <div className={`${s.line} line`}></div>
      {session?.user && <AuthStatus email={session.user.email} />}
      {isHome && <div className={`${s.gradient} gradient`}></div>}
      {isAdmin && (
        <>
          {children}
          <Footer />
        </>
      )}
      {!isAdmin && (
        <>
          <Header path={path} introduction={introduction} />
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
        .wrapper .buttonLink,
        .iconButton {
          color: ${theme.linkColor};
        }
        .wrapper .icon {
          fill: ${theme.linkColor};
        }
        .wrapper a:hover,
        .wrapper .buttonLink:hover,
        .iconButton:hover {
          color: ${theme.linkHoverColor};
        }
        .wrapper .icon:hover {
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
        .itemWrapper .buttonLink:hover {
          color: ${theme.linkHoverItemColor};
        }
        .itemWrapper .icon:hover {
          fill: ${theme.linkHoverItemColor};
        }
      `}</style>
    </div>
  );
}
