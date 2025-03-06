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
import { EB_Garamond, Spectral_SC } from "next/font/google";

const spectralSC = Spectral_SC({
  subsets: ["latin"],
  weight: "800",
  variable: "--font-serif-SSC",
});

const garamond = EB_Garamond({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-serif-G",
});

export async function generateMetadata(): Promise<Metadata | undefined> {
  const metas = getMetaMap(await getMetas());
  if (metas) {
    return {
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
  }
}

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
    <html lang="fr" className={`${garamond.variable} ${spectralSC.variable}`}>
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
