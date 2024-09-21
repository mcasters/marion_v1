"use client";

import Link from "next/link";
import Image from "next/image";

import { MENU_2 } from "@/constants/routes";
import s from "@/styles/Nav_2.module.css";
import { useTheme } from "@/app/context/themeProvider";
import LAYOUT from "@/constants/layout";

interface Props {
  navType: string;
}

export default function Nav_2({ navType }: Props) {
  const theme = useTheme();
  const colorWithOpacity = theme.menu2HomeColor + "aa";

  return (
    <div>
      <nav
        className={
          navType === LAYOUT.ITEM_NAV
            ? `${s.itemNav} itemNav`
            : navType === LAYOUT.HOME_NAV
            ? `${s.homeNav} homeNav`
            : navType === LAYOUT.HOME_NAV_FIX
            ? `${s.homeNavFix} homeNavFix ${s.homeNav} homeNav`
            : `${s.nav} nav`
        }
      >
        <ul className={s.menu}>
          {MENU_2.map((menuItem) => {
            if (menuItem.NAME === "Home")
              return (
                <li key={menuItem.NAME} className={s.liHome}>
                  <Link
                    href={menuItem.PATH}
                    key={menuItem.NAME}
                    legacyBehavior={false}
                  >
                    <Image
                      loader={({ src, width, quality }) => {
                        return `/${src}`;
                      }}
                      src="logo-100.png"
                      alt="Signature de Marion Casters"
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
              <li key={menuItem.NAME}>
                <Link
                  href={menuItem.PATH}
                  key={menuItem.NAME}
                  legacyBehavior={true}
                >
                  <a className={`${s.link} link`}>{menuItem.NAME}</a>
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
    </div>
  );
}
