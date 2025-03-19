"use client";

import Link from "next/link";
import Image from "next/image";

import { MENU_2 } from "@/constants/specific/routes";
import s from "@/styles/nav_2.module.css";
import { useTheme } from "@/app/context/themeProvider";
import { useMetas } from "@/app/context/metaProvider";
import { getBorderColor } from "@/utils/commonUtils";
import { META } from "@/constants/admin";

interface Props {
  navLayout: string;
}

export default function Nav_2({ navLayout }: Props) {
  const theme = useTheme();
  const metas = useMetas();

  return (
    <nav className={`${s[navLayout]} ${navLayout}`}>
      <ul className={s.ul}>
        {MENU_2.map((menuItem) => {
          if (menuItem.TAG === "Home")
            return (
              <li key={menuItem.TAG}>
                <Link href={menuItem.ROUTE} key={menuItem.TAG}>
                  <Image
                    src="/logo-mc-100.png"
                    alt={`Signature de ${metas.get(META.SITE_TITLE)}`}
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
          background-color: ${theme.menu2ItemColor};
          border-bottom: 1px solid ${getBorderColor(theme.menu2ItemColor)};
        }
        .nav {
          background-color: ${theme.menu2Color};
          border-bottom: 1px solid ${getBorderColor(theme.menu2Color)};
        }
        .homeNavFix {
          background-color: ${theme.menu2HomeColor + "aa"};
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
    </nav>
  );
}
