import { Metadata } from "next";
import Layout from "@/components/layout/Layout";
import Providers from "./context/providers";
import "@/styles/globals-specific.css";
import { getIntroText, getMetaMap, themeToHexa } from "@/utils/commonUtils";
import React from "react";
import StyledJsxRegistry from "./registry";
import {
  DESCRIPTION,
  DOCUMENT_TITLE,
  GENERAL,
  KEYWORDS,
} from "@/constants/specific/metaHtml";
import { getSession } from "@/app/lib/auth";
import { getContentsFull } from "@/app/actions/contents";
import { getActiveTheme, getPresetColors } from "@/app/actions/theme";
import { getMetas } from "@/app/actions/meta";

export const metadata: Metadata = {
  title: GENERAL.SITE_TITLE,
  description: DESCRIPTION.HOME,
  keywords: KEYWORDS,
  openGraph: {
    title: DOCUMENT_TITLE.HOME,
    description: DESCRIPTION.HOME,
    url: GENERAL.URL,
    siteName: GENERAL.SITE_TITLE,
    locale: "fr",
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  const contents = await getContentsFull();
  const theme = await getActiveTheme();
  const presetColors = await getPresetColors();
  const hexaTheme = themeToHexa(theme, presetColors);
  const metas = await getMetas();
  const metaMap = getMetaMap(metas);

  return (
    <html lang="fr">
      <body>
        <Providers session={session} theme={hexaTheme} metaMap={metaMap}>
          <StyledJsxRegistry>
            <Layout introduction={getIntroText(contents)}>{children}</Layout>
          </StyledJsxRegistry>
        </Providers>
      </body>
    </html>
  );
}
