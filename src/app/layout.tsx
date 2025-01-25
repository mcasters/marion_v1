import { Metadata } from "next";
import Layout from "@/components/layout/Layout";
import Providers from "./context/providers";
import "@/styles/globals-specific.css";
import { getContentsFull } from "@/app/api/content/getContents";
import { getSculptureCategoriesFull } from "@/app/api/sculpture/category/getCategories";
import { getIntroText, themeToHexa } from "@/utils/commonUtils";
import React from "react";
import { getActiveTheme, getPresetColors } from "@/app/api/theme/getTheme";
import StyledJsxRegistry from "./registry";
import { DESCRIPTION, GENERAL, KEYWORDS } from "@/constants/specific/metaHtml";
import { getSession } from "@/app/lib/auth/lib";
import { getDrawingCategoriesFull } from "@/app/api/dessin/category/getCategories";
import { TEXTS } from "@/constants/specific";
import { getPaintingCategoriesFull } from "@/app/actions/paintings/category";

export const metadata: Metadata = {
  title: GENERAL.SITE_TITLE,
  description: DESCRIPTION.HOME,
  keywords: KEYWORDS,
  openGraph: {
    title: GENERAL.SITE_TITLE,
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
  const paintingCategories = await getPaintingCategoriesFull();
  const sculptureCategories = await getSculptureCategoriesFull();
  let drawingCategories = undefined;
  if (TEXTS.TITLE === "Marion Casters")
    drawingCategories = await getDrawingCategoriesFull();
  const theme = await getActiveTheme();
  const presetColors = await getPresetColors();
  const hexaTheme = themeToHexa(theme, presetColors);

  return (
    <html lang="fr">
      <body>
        <Providers session={session} theme={hexaTheme}>
          <StyledJsxRegistry>
            <Layout
              introduction={getIntroText(contents)}
              paintingCategories={paintingCategories}
              sculptureCategories={sculptureCategories}
              drawingCategories={drawingCategories}
            >
              {children}
            </Layout>
          </StyledJsxRegistry>
        </Providers>
      </body>
    </html>
  );
}
