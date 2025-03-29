"use client";

import s from "@/components/layout/footer.module.css";
import { ROUTES } from "@/constants/specific/routes";
import { useSession } from "@/app/context/sessionProvider";
import Link from "next/link";
import { useTheme } from "@/app/context/themeProvider";
import { useMetas } from "@/app/context/metaProvider";
import { META } from "@/constants/admin";

type Props = {
  isItem: boolean;
  isHome: boolean;
};

export default function Footer({ isItem, isHome }: Props) {
  const session = useSession();
  const metas = useMetas();
  const theme = useTheme();

  return (
    <>
      <footer
        className={s.footer}
        style={
          isItem
            ? {
                color: theme.item.footer.text,
                backgroundColor: theme.item.footer.background,
              }
            : isHome
              ? {
                  color: theme.home.footer.text,
                  backgroundColor: theme.home.footer.background,
                }
              : {
                  color: theme.other.footer.text,
                  backgroundColor: theme.other.footer.background,
                }
        }
      >
        <p>{metas.get(META.FOOTER)}</p>
        <br />
        <br />
        {!session?.user && (
          <Link
            href={ROUTES.LOGIN}
            style={
              isItem
                ? { color: theme.item.footer.link }
                : isHome
                  ? { color: theme.home.footer.link }
                  : { color: theme.other.footer.link }
            }
          >
            Admin
          </Link>
        )}
      </footer>
    </>
  );
}
