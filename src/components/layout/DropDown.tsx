"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";

import { PaintingCategory, SculptureCategory } from "@prisma/client";
import s from "./DropDown.module.css";
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
  const themeLink = useMemo(() => {
    return navType === LAYOUT.ITEM_NAV
      ? theme.menu1LinkItemColor
      : navType === LAYOUT.HOME_NAV
        ? theme.menu1LinkHomeColor
        : theme.menu1LinkColor;
  }, [theme, navType]);
  const themeLinkHover = useMemo(() => {
    return navType === LAYOUT.ITEM_NAV
      ? theme.menu1LinkHoverItemColor
      : navType === LAYOUT.HOME_NAV
        ? theme.menu1LinkHomeHoverColor
        : theme.menu1LinkHoverColor;
  }, [theme, navType]);

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
    <div className={s.dropdown}>
      <button
        onClick={toggle}
        onMouseEnter={openMenu}
        onMouseLeave={closeMenu}
        className={
          isActive ? `${s.link} ${s.active} link active` : `${s.link} link`
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
        .link {
          color: ${themeLink};
        }
        .link:hover {
          color: ${themeLinkHover};
        }
        .link.active {
          border-bottom-color: ${theme.menu2LinkItemColor};
        }
      `}</style>
    </div>
  );
}
