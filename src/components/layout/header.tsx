"use client";

import Nav_1 from "@/components/layout/nav_1/nav_1.tsx";
import Nav_2 from "@/components/layout/nav_2/nav_2.tsx";
import s from "./layout.module.css";
import React from "react";

type Props = {
  isWork: boolean;
};

export default function Header({ isWork }: Props) {
  return (
    <header className={s.header}>
      <Nav_1 navClass={isWork ? "itemNav" : "nav"} />
      <Nav_2 navClass={isWork ? "itemNav" : "nav"} />
    </header>
  );
}
