"use client";

import Link from "next/link";
import Image from "next/image";

import { MENU_2 } from "@/constants/specific/routes";
import s from "@/styles/Nav_2.module.css";
import { useTheme } from "@/app/context/themeProvider";
import { useMetas } from "@/app/context/metaProvider";
import { META } from "@/constants/specific";

interface Props {
  navLayout: string;
}

export default function Nav_2({ navLayout }: Props) {
  const theme = useTheme();
  const metas = useMetas();
  const colorWithOpacity = theme.menu2HomeColor + "aa";

  return (
    <>
      <nav className={`${s[navLayout]} ${navLayout}`}>
        <ul className={s.menu}>
          {MENU_2.map((menuItem) => {
            if (menuItem.TAG === "Home")
              return (
                <li key={menuItem.TAG} className={s.liHome}>
                  <Link href={menuItem.ROUTE} key={menuItem.TAG}>
                    <Image
                      loader={({ src }) => {
                        return `/${src}`;
                      }}
                      src="logo-100.png"
                      alt={`Signature de ${metas.get(META.SITE_TITLE)}`}
                      width={30}
                      height={30}
                      className={s.logo}
                      style={{
                        objectFit: "contain",
                      }}
                      priority
                    />
                  </Link>
                </li>
              );
            return (
              <li key={menuItem.TAG}>
                <Link href={menuItem.ROUTE} key={menuItem.TAG} legacyBehavior>
                  <a className={`${s.link} link`}>{menuItem.TAG}</a>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <style jsx>{`
        .itemNav {
          background-color: ${theme.menu2ItemColor};
        }
        .nav {
          background-color: ${theme.menu2Color};
        }
        .homeNavFix {
          background-color: ${colorWithOpacity};
        }
        .homeNav .link {
          color: ${theme.menu2LinkHomeColor};
        }
        .nav .link {
          color: ${theme.menu2LinkColor};
        }
        .itemNav .link {
          color: ${theme.menu2LinkItemColor};
        }
        .homeNav .link:hover {
          color: ${theme.menu2LinkHomeHoverColor};
        }
        .nav .link:hover {
          color: ${theme.menu2LinkHoverColor};
        }
        .itemNav .link:hover {
          color: ${theme.menu2LinkHoverItemColor};
        }
      `}</style>
    </>
  );
}
