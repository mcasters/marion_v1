"use client";

import s from "@/styles/Footer.module.css";
import { ROUTES } from "@/constants/specific/routes";
import { useSession } from "@/app/context/sessionProvider";
import Link from "next/link";
import { useTheme } from "@/app/context/themeProvider";
import { useMetas } from "@/app/context/metaProvider";
import { META } from "@/constants/admin";

type Props = {
  path: string | null;
};

export default function Footer({ path }: Props) {
  const session = useSession();
  const metas = useMetas();
  const theme = useTheme();
  const isPainting = path === ROUTES.PAINTING;
  const isSculpture = path === ROUTES.SCULPTURE;
  const isM = metas.get(META.SITE_TITLE)?.startsWith("M");
  const isDrawing = isM ? path === ROUTES.DRAWING : false;
  const isDark = isPainting || isSculpture || isDrawing;

  return (
    <>
      <footer
        className={isDark ? `${s.footer} ${s.dark}` : s.footer}
        style={
          !isDark
            ? { color: theme.color }
            : isM
              ? { color: theme.linkHoverColor }
              : { color: theme.colorItem }
        }
      >
        <p>{metas.get(META.FOOTER)}</p>
        <br />
        <br />
        {!session?.user && <Link href={ROUTES.LOGIN}>Admin</Link>}
      </footer>
    </>
  );
}
