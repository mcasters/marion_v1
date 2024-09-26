"use client";

import React, { useState } from "react";
import Link from "next/link";
import s from "./DropDown.module.css";
import { useTheme } from "@/app/context/themeProvider";
import { Category } from "@/lib/db/item";
import { MENU_1_ITEMS } from "@/constants/routes";
import { usePathname } from "next/navigation";

interface Props {
  itemName: string;
  menuItems: Category[];
  themeLink: string;
  themeLinkHover: string;
  themeBorderActive: string;
}
export default function Dropdown({
  itemName,
  menuItems,
  themeLink,
  themeLinkHover,
  themeBorderActive,
}: Props) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const item = MENU_1_ITEMS[itemName];
  const basePath = usePathname().split("/")[1];
  const isActive = basePath === item.BASE_PATH;

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
        {itemName}
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
          border-bottom-color: ${themeBorderActive};
        }
      `}</style>
    </div>
  );
}
