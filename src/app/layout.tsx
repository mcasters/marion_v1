import { Metadata } from "next";
import { getServerSession } from "next-auth/next";

import Layout from "@/components/layout/Layout";
import Providers from "./context/providers";
import { authOptions } from "@/utils/authOptions";
import "@/styles/globals.css";
import { getContentsFull } from "@/app/api/content/getContents";
import { getPaintingCategoriesForMenu } from "@/app/api/peinture/category/getCategories";
import { getSculptureCategoriesForMenu } from "@/app/api/sculpture/category/getCategories";
import { getIntroText, themeToHexa } from "@/utils/commonUtils";
import React from "react";
import { getActiveTheme, getPresetColors } from "@/app/api/theme/getTheme";
import StyledJsxRegistry from "./registry";
import { DESCRIPTION, DOCUMENT_TITLE, KEYWORDS } from "@/constants/metaHtml";

export const metadata: Metadata = {
  title: DOCUMENT_TITLE.HOME,
  description: DESCRIPTION.HOME,
  keywords: KEYWORDS,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  const contents = await getContentsFull();
  const paintingCategories = await getPaintingCategoriesForMenu();
  const sculptureCategories = await getSculptureCategoriesForMenu();
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
            >
              {children}
            </Layout>
          </StyledJsxRegistry>
        </Providers>
      </body>
    </html>
  );
}
