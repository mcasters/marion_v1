"use client";

import { usePathname } from "next/navigation";

import AuthStatus from "@/components/auth/AuthStatus";
import s from "@/styles/Footer.module.css";

export default function Footer() {
  const authStatus = AuthStatus();
  const pathname = usePathname();
  const isPainting = pathname.split("/")[1] === "peintures";
  const isSculpture = pathname.split("/")[1] === "sculptures";
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
