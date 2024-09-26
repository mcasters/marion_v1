"use client";

import { usePathname } from "next/navigation";

import AuthStatus from "@/components/auth/AuthStatus";
import s from "@/styles/Footer.module.css";
import { BASE_PATH } from "@/constants/routes";

export default function Footer() {
  const authStatus = AuthStatus();
  const basePath = usePathname().split("/")[1];
  const isPainting = basePath === BASE_PATH.PAINTING;
  const isSculpture = basePath === BASE_PATH.SCULPTURE;
  const text =
    "Images and site content copyright © 2024 Marion Casters. All rights reserved";

  return (
    <>
      <footer
        className={
          isPainting || isSculpture ? `${s.footer} ${s.dark}` : s.footer
        }
      >
        <div className={s.center}>
          <p>{text}</p>
          <br />
          <br />
          {authStatus}
        </div>
      </footer>
    </>
  );
}
