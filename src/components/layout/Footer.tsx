"use client";

import { usePathname } from "next/navigation";
import s from "@/styles/Footer.module.css";
import { ROUTES } from "@/constants/specific/routes";
import { TEXTS } from "@/constants/specific";
import { useSession } from "@/app/context/sessionProvider";
import Link from "next/link";

export default function Footer() {
  const session = useSession();
  const path = usePathname();
  const isPainting = path === ROUTES.PAINTING;
  const isSculpture = path === ROUTES.SCULPTURE;
  const text = TEXTS.FOOTER;

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
          {!session?.user && <Link href={ROUTES.LOGIN}>Admin</Link>}
        </div>
      </footer>
    </>
  );
}
