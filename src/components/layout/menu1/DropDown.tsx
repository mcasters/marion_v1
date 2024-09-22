"use client";

import React, { useState } from "react";
import Link from "next/link";
import s from "./DropDown.module.css";
import { useTheme } from "@/app/context/themeProvider";
import { Category } from "@/lib/db/item";

interface Props {
  menuItems: Category[];
  path: string;
  name: string;
  isActive: boolean;
  themeLink: string;
  themeLinkHover: string;
  themeBorderActive: string;
}
export default function Dropdown({
  menuItems,
  path,
  name,
  isActive,
  themeLink,
  themeLinkHover,
  themeBorderActive,
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
          border-bottom-color: ${themeBorderActive};
        }
      `}</style>
    </div>
  );
}
