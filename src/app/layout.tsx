import { Metadata } from "next";
import Layout from "@/components/layout/Layout";
import Providers from "./context/providers";
import "@/styles/globals-specific.css";
import { getIntroText, getMetaMap, themeToHexa } from "@/utils/commonUtils";
import React from "react";
import StyledJsxRegistry from "./registry";
import { getSession } from "@/app/lib/auth";
import { getContentsFull } from "@/app/actions/contents";
import { getActiveTheme, getPresetColors } from "@/app/actions/theme";
import { getMetas } from "@/app/actions/meta";
import { META } from "@/constants/specific";

const metas = getMetaMap(await getMetas());

export const metadata: Metadata = {
  title: metas.get(META.DOCUMENT_TITLE_HOME),
  description: metas.get(META.DESCRIPTION_HOME),
  keywords: metas.get(META.KEYWORDS),
  openGraph: {
    title: metas.get(META.DOCUMENT_TITLE_HOME),
    description: metas.get(META.DESCRIPTION_HOME),
    url: metas.get(META.URL),
    siteName: metas.get(META.SEO_SITE_TITLE),
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
  const metaMap = getMetaMap(await getMetas());

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
