"use client";

import React, { useState } from "react";
import Link from "next/link";

import { PaintingCategory, SculptureCategory } from "@prisma/client";
import s from "@/styles/Nav_1.module.css";
import { useTheme } from "@/app/context/themeProvider";
import LAYOUT from "@/constants/layout";

interface Props {
  menuItems: PaintingCategory[] | SculptureCategory[];
  path: string;
  name: string;
  isActive: boolean;
  navType: string;
}
export default function Dropdown({
  menuItems,
  path,
  name,
  isActive,
  navType,
}: Props) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const toggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setOpen(!open);
  };

  const openMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpen(true);
  };

  const closeMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpen(false);
  };

  return (
    <li
      className={
        navType === LAYOUT.ITEM_NAV
          ? `${s.dropdown} itemNav`
          : navType === LAYOUT.HOME_NAV
          ? `${s.dropdown} homeNav`
          : navType === LAYOUT.HOME_NAV_FIX
          ? `${s.dropdown} homeNavFix ${s.homeNav} homeNav`
          : `${s.dropdown} nav`
      }
    >
      <button
        onClick={toggle}
        onMouseEnter={openMenu}
        onMouseLeave={closeMenu}
        className={
          isActive
            ? `${s.link} ${s.active} link active buttonLink`
            : `${s.link} link buttonLink`
        }
      >
        {name}
      </button>
      {open ? (
        <ul
          className={s.subMenu}
          onMouseEnter={openMenu}
          onMouseLeave={closeMenu}
        >
          {menuItems.map((menuItem, index) => (
            <li key={index}>
              <Link
                href={`${path}/${menuItem.key}`}
                legacyBehavior={false}
                onClick={(e) => {
                  setOpen(false);
                }}
                className={s.subLink}
                style={{ color: `${theme.menu1LinkHomeColor}` }}
              >
                {menuItem.value}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
      <style jsx>{`
        .homeNav .link {
          color: ${theme.menu1LinkHomeColor};
        }
        .nav .link {
          color: ${theme.menu1LinkColor};
        }
        .itemNav .link {
          color: ${theme.menu1LinkItemColor};
        }
        .homeNav .link:hover {
          color: ${theme.menu1LinkHomeHoverColor};
        }
        .nav .link:hover {
          color: ${theme.menu1LinkHoverColor};
        }
        .itemNav .link:hover {
          color: ${theme.menu1LinkHoverItemColor};
        }
        .nav .link.active {
          border-bottom-color: ${theme.menu2LinkItemColor};
        }
        .itemNav .link.active {
          border-bottom-color: ${theme.menu2LinkItemColor};
        }
      `}</style>
    </li>
  );
}
