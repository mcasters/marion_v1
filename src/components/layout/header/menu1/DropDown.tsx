"use client";

import React, { useState } from "react";
import Link from "next/link";
import s from "./NavItem.module.css";
import { useTheme } from "@/app/context/themeProvider";
import { CategoryFull } from "@/lib/type";
import { MENU_1_ITEMS } from "@/constants/specific/routes";
import { usePathname } from "next/navigation";

interface Props {
  itemTag: string;
  menuItems: CategoryFull[];
  themeLink: string;
  themeLinkHover: string;
  themeBorderActive: string;
}
export default function Dropdown({
  itemTag,
  menuItems,
  themeLink,
  themeLinkHover,
  themeBorderActive,
}: Props) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const item = MENU_1_ITEMS[itemTag];
  const basePath = usePathname().split("/")[1];
  const isActive = basePath === item.BASE_PATH;

  const openMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpen(true);
  };

  const closeMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpen(false);
  };

  return (
    <div className={s.dropdown}>
      <Link href={`/${item.BASE_PATH}`} legacyBehavior>
        <a
          className={
            isActive ? `${s.link} ${s.active} link active` : `${s.link} link`
          }
          onMouseEnter={openMenu}
          onMouseLeave={closeMenu}
        >
          {item.TAG}
        </a>
      </Link>
      {open ? (
        <ul
          className={s.subMenu}
          onMouseEnter={openMenu}
          onMouseLeave={closeMenu}
        >
          {menuItems.map((menuItem, index) => {
            if (menuItem.count > 0) {
              return (
                <li key={index}>
                  <Link
                    href={`/${item.BASE_PATH}/${menuItem.key}`}
                    onClick={() => {
                      setOpen(false);
                    }}
                    className={s.subLink}
                    style={{ color: `${theme.menu1LinkHomeColor}` }}
                  >
                    {menuItem.value}
                  </Link>
                </li>
              );
            }
          })}
          <li>
            <Link
              href={`/${item.BASE_PATH}/par_annee`}
              onClick={() => {
                setOpen(false);
              }}
              className={s.subLink}
              style={{ color: `${theme.menu1LinkHomeColor}` }}
            >
              FILTRE PAR ANNÉE
            </Link>
          </li>
        </ul>
      ) : null}
      <style jsx>{`
        .link {
          color: ${themeLink};
        }
        .link:hover {
          color: ${themeLinkHover};
        }
        .link.active {
          border-bottom-color: ${themeBorderActive};
        }
      `}</style>
    </div>
  );
}
