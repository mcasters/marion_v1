"use client";

import React, { ReactNode } from "react";
import { usePathname } from "next/navigation";

import { ROUTES } from "@/constants/specific/routes";
import Header from "./header/header";
import Main from "./main";
import Footer from "./footer";
import s from "@/components/layout/layout.module.css";
import { useTheme } from "@/app/context/themeProvider";
import { getHomeLayout } from "@/utils/commonUtils";
import AuthStatus from "@/components/auth/authStatus";
import { useSession } from "@/app/context/sessionProvider";
import AdminNav from "@/components/layout/admin/adminNav";
import { useMetas } from "@/app/context/metaProvider";
import { HomeLayout } from "@/lib/type";
import { hexToRgb } from "@/utils/themeUtils";

interface Props {
  introduction: string;
  children: ReactNode;
}

export default function Layout({ introduction, children }: Props) {
  const theme = useTheme();
  const path = `/${usePathname().split("/")[1]}`;
  const session = useSession();
  const metas = useMetas();
  const isPlainHomeLayout = getHomeLayout(metas) === HomeLayout.PLAIN;

  const isHome = path === ROUTES.HOME;
  const isItem =
    path === ROUTES.PAINTING ||
    path === ROUTES.SCULPTURE ||
    path === ROUTES.DRAWING;
  const isAdminPage = path === ROUTES.ADMIN;

  const gradientRgbObject = hexToRgb(theme.home.menu1.background);
  const gradientRgb = `${gradientRgbObject?.r},${gradientRgbObject?.g},${gradientRgbObject?.b}`;

  return (
    <div
      className={
        isItem ? `${s.itemWrapper} itemWrapper` : `${s.wrapper} wrapper`
      }
    >
      <div className={`${s.line} line`}></div>
      {session?.user && <AuthStatus email={session.user.email} />}
      {isHome && !isPlainHomeLayout && (
        <div className={`${s.gradient} gradient`}></div>
      )}
      {isAdminPage ? (
        <AdminNav />
      ) : (
        <Header
          path={path}
          isPlainHomeLayout={isPlainHomeLayout}
          introduction={introduction}
        />
      )}
      <Main isHome={isHome}>{children}</Main>
      <Footer isItem={isItem} isHome={isHome} />
      <style jsx global>{`
        .line {
          background-color: ${theme.lineColor};
        }
        .wrapper {
          background-color: ${theme.other.main.background};
          color: ${theme.other.main.text};
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
        .iconButton,
        .linkColor {
          color: ${theme.other.main.link};
        }
        .wrapper .icon {
          fill: ${theme.other.main.link};
        }
        .wrapper a:hover,
        .wrapper .buttonLink:hover,
        .iconButton:hover {
          color: ${theme.other.main.linkHover};
        }
        .wrapper .icon:hover {
          fill: ${theme.other.main.linkHover};
        }
        .itemWrapper {
          background-color: ${theme.item.main.background};
          color: ${theme.item.main.text};
        }
        .itemWrapper a,
        .itemWrapper .buttonLink {
          color: ${theme.item.main.link};
        }
        .itemWrapper .icon {
          fill: ${theme.item.main.link};
        }
        .itemWrapper a:hover,
        .itemWrapper .buttonLink:hover {
          color: ${theme.item.main.linkHover};
        }
        .itemWrapper .icon:hover {
          fill: ${theme.item.main.linkHover};
        }
      `}</style>
    </div>
  );
}
