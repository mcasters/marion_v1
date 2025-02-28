"use client";

import s from "@/styles/Footer.module.css";
import { ROUTES } from "@/constants/specific/routes";
import { TEXTS } from "@/constants/specific";
import { useSession } from "@/app/context/sessionProvider";
import Link from "next/link";
import { useTheme } from "@/app/context/themeProvider";

type Props = {
  path: string | null;
};

export default function Footer({ path }: Props) {
  const session = useSession();
  const theme = useTheme();
  const isPainting = path === ROUTES.PAINTING;
  const isSculpture = path === ROUTES.SCULPTURE;
  const isDrawing =
    TEXTS.TITLE === "Marion Casters" ? path === ROUTES.DRAWING : false;
  const text = TEXTS.FOOTER;
  const isDark = isPainting || isSculpture || isDrawing;

  return (
    <>
      <footer
        className={isDark ? `${s.footer} ${s.dark}` : s.footer}
        style={isDark ? { color: theme.colorItem } : { color: theme.color }}
      >
        <p>{text}</p>
        <br />
        <br />
        {!session?.user && <Link href={ROUTES.LOGIN}>Admin</Link>}
      </footer>
    </>
  );
}
