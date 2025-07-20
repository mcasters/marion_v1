"use client";

import Link from "next/link";

import { MENU_2 } from "@/constants/specific/routes.ts";
import s from "@/components/layout/nav_2/nav_2.module.css";
import { useTheme } from "@/app/context/themeProvider.tsx";
import { useMetas } from "@/app/context/metaProvider.tsx";
import { META } from "@/constants/admin.ts";
import { getDarkerColor } from "@/lib/utils/themeUtils.ts";
import LogoIcon from "@/components/icons/logoIcon.tsx";
import Image from "next/image";

interface Props {
  navClass: string;
}

export default function Nav_2({ navClass }: Props) {
  const theme = useTheme();
  const metas = useMetas();
  const owner = metas.get(META.SITE_TITLE);

  return (
    <nav className={`${s[navClass]} ${navClass} nav2`}>
      <ul className={s.ul}>
        {MENU_2.map((menuItem) => {
          if (menuItem.TAG === "Home")
            return (
              <li key={menuItem.TAG}>
                {owner?.startsWith("M") && (
                  <Link href={menuItem.ROUTE} key={menuItem.TAG}>
                    <LogoIcon width="35" height="35" />
                  </Link>
                )}
                {owner?.startsWith("T") && (
                  <Link href={menuItem.ROUTE} key={menuItem.TAG}>
                    <Image
                      src="/logo-100.png"
                      alt={`Signature de ${owner}`}
                      width={40}
                      height={40}
                      className={s.logo}
                      priority
                      unoptimized
                    />
                  </Link>
                )}
              </li>
            );
          return (
            <li key={menuItem.TAG}>
              <Link href={menuItem.ROUTE} key={menuItem.TAG}>
                {menuItem.TAG}
              </Link>
            </li>
          );
        })}
      </ul>
      <style jsx>{`
        .itemNav {
          background-color: ${theme.item.menu2.background};
          border-bottom: 1px solid
            ${getDarkerColor(theme.item.menu2.background, -10)};
        }
        .nav {
          background-color: ${theme.other.menu2.background};
          border-bottom: 1px solid
            ${getDarkerColor(theme.other.menu2.background, -10)};
        }
        .homeNavFix {
          background-color: ${theme.home.menu2.background + "aa"};
        }
      `}</style>
    </nav>
  );
}
