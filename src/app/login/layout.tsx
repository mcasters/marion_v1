import s from "@/styles/authPage.module.css";
import React, { ReactNode } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "",
  description: "",
  keywords: "",
  openGraph: null,
};

export default function Page({ children }: { children: ReactNode }) {
  return (
    <div className={s.container}>
      <h1>Espace administration :</h1>
      <h2>Authentification nécessaire</h2>
      {children}
    </div>
  );
}
