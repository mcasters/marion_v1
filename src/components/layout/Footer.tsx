"use client";

import s from "@/styles/Footer.module.css";
import { ROUTES } from "@/constants/specific/routes";
import { TEXTS } from "@/constants/specific";
import { useSession } from "@/app/context/sessionProvider";
import Link from "next/link";

type Props = {
  path: string | null;
};

export default function Footer({ path }: Props) {
  const session = useSession();
  const isPainting = path === ROUTES.PAINTING;
  const isSculpture = path === ROUTES.SCULPTURE;
  const isDrawing =
    TEXTS.TITLE === "Marion Casters" ? path === ROUTES.DRAWING : false;
  const text = TEXTS.FOOTER;

  return (
    <>
      <footer
        className={
          isPainting || isSculpture || isDrawing
            ? `${s.footer} ${s.dark}`
            : s.footer
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
