"use client";

import { ReactNode } from "react";

import Main from "@/components/layout/Main";
import AdminNav from "@/components/layout/AdminNav";
import s from "@/styles/admin/Admin.module.css";

interface Props {
  children: ReactNode;
}

export default function AdminLayout({ children }: Props) {
  return (
    <>
      <AdminNav />
      <Main isHome={false}>
        <div className={s.adminWrapper}>{children}</div>
      </Main>
    </>
  );
}
