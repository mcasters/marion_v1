import type { Viewport } from "next";
import { Metadata } from "next";
import Layout from "@/components/layout/layout";
import Providers from "./context/providers";
import "@/styles/globals-specific.css";
import { getIntroText, getMetaMap } from "@/utils/commonUtils";
import React from "react";
import StyledJsxRegistry from "./registry";
import { getSession } from "@/app/lib/auth";
import { getContentsFull } from "@/app/actions/contents";
import { getActiveTheme, getPresetColors } from "@/app/actions/theme";
import { getMetas } from "@/app/actions/meta";
import { Cormorant, Cormorant_SC } from "next/font/google";
import { META } from "@/constants/admin";

import { getStructHexaTheme } from "@/utils/serverUtils";

const cormorant = Cormorant({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-serif-cormorant",
});

const cormorantSC = Cormorant_SC({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-serif-cormorant-caps",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

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
  const theme = await getActiveTheme();
  const pColors = await getPresetColors();
  const structuredTheme = await getStructHexaTheme(theme, pColors);
  const metas = await getMetas();
  const contents = await getContentsFull();

  return (
    <html lang="fr" className={`${cormorant.variable} ${cormorantSC.variable}`}>
      <body>
        <Providers
          session={session}
          theme={structuredTheme}
          metaMap={getMetaMap(metas)}
        >
          <StyledJsxRegistry>
            <Layout introduction={getIntroText(contents)}>{children}</Layout>
          </StyledJsxRegistry>
        </Providers>
      </body>
    </html>
  );
}
