"use client";

import React, { ReactNode } from "react";
import { usePathname } from "next/navigation";

import { ROUTES } from "@/constants/specific/routes";
import Header from "./header.tsx";
import Footer from "./footer";
import s from "@/components/layout/layout.module.css";
import { useTheme } from "@/app/context/themeProvider";
import { getHomeLayout } from "@/lib/utils/commonUtils";
import AuthStatus from "@/components/auth/authStatus";
import { useSession } from "@/app/context/sessionProvider";
import AdminNav from "@/components/layout/admin/adminNav";
import { useMetas } from "@/app/context/metaProvider";
import { HomeLayout } from "@/lib/type";
import { hexToRgb } from "@/lib/utils/themeUtils";
import { META } from "@/constants/admin.ts";
import HomeHeader from "@/components/layout/homeHeader.tsx";

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
  const isWork =
    path === ROUTES.PAINTING ||
    path === ROUTES.SCULPTURE ||
    path === ROUTES.DRAWING;
  const isAdmin = path === ROUTES.ADMIN;
  const gradientRgbObject = hexToRgb(theme.home.menu1.background);
  const gradientRgb = `${gradientRgbObject?.r},${gradientRgbObject?.g},${gradientRgbObject?.b}`;

  return (
    <div
      className={`${isWork ? "itemWrap" : isHome ? "homeWrap" : "otherWrap"} ${s.wrapper}`}
    >
      <div className={`${s.line} line`}></div>
      {session?.user && <AuthStatus email={session.user.email} />}
      {isHome && !isPlainHomeLayout && (
        <div className={`${s.gradient} gradient`}></div>
      )}
      {isAdmin ? (
        <AdminNav />
      ) : isHome ? (
        <HomeHeader
          isPlainHomeLayout={isPlainHomeLayout}
          title={metas.get(META.SITE_TITLE) || ""}
          introduction={introduction}
        />
      ) : (
        <Header isWork={isWork} />
      )}
      <main className={isHome ? undefined : s.main}>{children}</main>
      <Footer footerClass={isWork ? "work" : isHome ? "home" : "other"} />
      <style jsx global>{`
        .line {
          background-color: ${theme.general.lineColor};
        }
        .otherWrap {
          background-color: ${theme.other.main.background};
          color: ${theme.other.main.text};
        }
        .itemWrap {
          background-color: ${theme.work.main.background};
          color: ${theme.work.main.text};
        }
        .homeWrap {
          background-color: ${theme.home.main.background};
          color: ${theme.home.main.text};
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
        .title {
          color: ${theme.general.titleColor};
        }
        .intro {
          color: ${theme.home.main.text};
        }
        .homeWrap > header > .nav1 > ul > li > a {
          color: ${theme.home.menu1.link};
        }
        .itemWrap > header > .nav1 > ul > li > a {
          color: ${theme.work.menu1.link};
        }
        .otherWrap > header > .nav1 > ul > li > a {
          color: ${theme.other.menu1.link};
        }

        .homeWrap > header > .nav1 > ul > li > a:hover {
          color: ${theme.home.menu1.linkHover};
        }
        .itemWrap > header > .nav1 > ul > li > a:hover {
          color: ${theme.work.menu1.linkHover};
        }
        .otherWrap > header > .nav1 > ul > li > a:hover {
          color: ${theme.other.menu1.linkHover};
        }

        .itemWrap > header > .nav1 > ul > li > a.active {
          border-bottom-color: ${theme.work.menu1.linkHover};
        }

        .homeWrap > header > .nav2 > ul > li > a {
          color: ${theme.home.menu2.link};
        }
        .itemWrap > header > .nav2 > ul > li > a {
          color: ${theme.work.menu2.link};
        }
        .otherWrap > header > .nav2 > ul > li > a {
          color: ${theme.other.menu2.link};
        }

        .homeWrap > header > .nav2 > ul > li > a:hover {
          color: ${theme.home.menu2.linkHover};
        }
        .itemWrap > header > .nav2 > ul > li > a:hover {
          color: ${theme.work.menu2.linkHover};
        }
        .otherWrap > header > .nav2 > ul > li > a:hover {
          color: ${theme.other.menu2.linkHover};
        }
        .otherWrap a,
        .homeWrap a,
        .otherWrap .buttonLink,
        .homeWrap .buttonLink,
        .iconButton,
        .linkColor {
          color: ${theme.other.main.link};
        }
        .otherWrap .icon {
          fill: ${theme.other.main.link};
        }
        .selected,
        ::selection {
          background: ${theme.other.main.link};
          color: antiquewhite;
        }
        .selected .icon {
          fill: antiquewhite;
        }
        .otherWrap a:hover,
        .homeWrap a:hover,
        .otherWrap .buttonLink:hover,
        .homeWrap .buttonLink:hover,
        .iconButton:hover {
          color: ${theme.other.main.linkHover};
        }
        .otherWrap .icon:hover {
          fill: ${theme.other.main.linkHover};
        }
        .itemWrap a,
        .itemWrap .buttonLink {
          color: ${theme.work.main.link};
        }
        .itemWrap .icon {
          fill: ${theme.work.main.link};
        }
        .itemWrap a:hover,
        .itemWrap .buttonLink:hover {
          color: ${theme.work.main.linkHover};
        }
        .itemWrap .icon:hover {
          fill: ${theme.work.main.linkHover};
        }
        .homeWrap .homeIcon {
          fill: ${theme.general.titleColor};
        }
        .homeWrap .homeIcon:hover {
          fill: ${theme.home.menu2.link};
        }
        .otherWrap .homeIcon {
          fill: ${theme.other.menu1.link};
        }
        .otherWrap .homeIcon:hover {
          fill: ${theme.other.menu1.linkHover};
        }
        .itemWrap .homeIcon {
          fill: ${theme.work.menu1.link};
        }
        .itemWrap .homeIcon:hover {
          fill: ${theme.work.menu1.linkHover};
        }
      `}</style>
    </div>
  );
}
