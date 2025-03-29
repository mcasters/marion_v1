"use client";

import Link from "next/link";
import Image from "next/image";

import { MENU_2 } from "@/constants/specific/routes";
import s from "@/components/layout/header/nav_2/nav_2.module.css";
import { useTheme } from "@/app/context/themeProvider";
import { useMetas } from "@/app/context/metaProvider";
import { META } from "@/constants/admin";
import { getBorderColor } from "@/utils/themeUtils";

interface Props {
  navLayout: string;
}

export default function Nav_2({ navLayout }: Props) {
  const theme = useTheme();
  const metas = useMetas();
  const owner = metas.get(META.SITE_TITLE);

  return (
    <nav className={`${s[navLayout]} ${navLayout}`}>
      <ul className={s.ul}>
        {MENU_2.map((menuItem) => {
          if (menuItem.TAG === "Home")
            return (
              <li key={menuItem.TAG}>
                <Link href={menuItem.ROUTE} key={menuItem.TAG}>
                  <Image
                    src={
                      owner?.startsWith("M")
                        ? "/logo-mc-100.png"
                        : "/logo-100.png"
                    }
                    alt={`Signature de ${owner}`}
                    width={40}
                    height={40}
                    className={s.logo}
                    style={{
                      objectFit: "contain",
                    }}
                    priority
                    unoptimized
                  />
                </Link>
              </li>
            );
          return (
            <li key={menuItem.TAG}>
              <Link href={menuItem.ROUTE} key={menuItem.TAG} legacyBehavior>
                <a className="link">{menuItem.TAG}</a>
              </Link>
            </li>
          );
        })}
      </ul>
      <style jsx>{`
        .itemNav {
          background-color: ${theme.item.menu2.background};
          border-bottom: 1px solid
            ${getBorderColor(theme.item.menu2.background)};
        }
        .nav {
          background-color: ${theme.other.menu2.background};
          border-bottom: 1px solid
            ${getBorderColor(theme.other.menu2.background)};
        }
        .homeNavFix {
          background-color: ${theme.home.menu2.background + "aa"};
        }
        .homeNav .link {
          color: ${theme.home.menu2.link};
        }
        .nav .link {
          color: ${theme.other.menu2.link};
        }
        .itemNav .link {
          color: ${theme.item.menu2.link};
        }
        .homeNav .link:hover {
          color: ${theme.home.menu2.linkHover};
        }
        .nav .link:hover {
          color: ${theme.other.menu2.linkHover};
        }
        .itemNav .link:hover {
          color: ${theme.item.menu2.linkHover};
        }
      `}</style>
    </nav>
  );
}
