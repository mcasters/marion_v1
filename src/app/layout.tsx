import { Metadata } from "next";
import Layout from "@/components/layout/Layout";
import Providers from "./context/providers";
import "@/styles/globals.css";
import { getContentsFull } from "@/app/api/content/getContents";
import { getPaintingCategoriesForMenu } from "@/app/api/peinture/category/getCategories";
import { getSculptureCategoriesForMenu } from "@/app/api/sculpture/category/getCategories";
import { getIntroText, themeToHexa } from "@/utils/commonUtils";
import React from "react";
import { getActiveTheme, getPresetColors } from "@/app/api/theme/getTheme";
import StyledJsxRegistry from "./registry";
import { DESCRIPTION, GENERAL, KEYWORDS } from "@/constants/metaHtml";
import { getSession } from "@/app/lib/auth/lib";
import { getDrawingCategoriesForMenu } from "@/app/api/dessin/category/getCategories";

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
  const paintingCategories = await getPaintingCategoriesForMenu();
  const sculptureCategories = await getSculptureCategoriesForMenu();
  const drawingCategories = await getDrawingCategoriesForMenu();
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
