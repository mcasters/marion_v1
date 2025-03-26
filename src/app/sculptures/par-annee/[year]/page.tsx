import ItemsPageComponent from "@/components/item/itemsPageComponent";
import { getSession } from "@/app/lib/auth";
import { getItemsByYear } from "@/app/actions/items";
import { Type } from "@/lib/type";
import { Metadata } from "next";
import { getMetaMap } from "@/utils/commonUtils";
import { getMetas } from "@/app/actions/meta";

import { META } from "@/constants/admin";

type Props = {
  params: Promise<{ year: string }>;
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata | undefined> {
  const metas = getMetaMap(await getMetas());
  const year = (await params).year;
  if (metas) {
    return {
      title: `${metas.get(META.DOCUMENT_TITLE_SCULPTURE)} - Année ${year}`,
      description: `${metas.get(META.DESCRIPTION_SCULPTURE)} - Année ${year}`,
      openGraph: {
        title: `${metas.get(META.DOCUMENT_TITLE_SCULPTURE)} - Année ${year}`,
        description: `${metas.get(META.DESCRIPTION_SCULPTURE)} - Année ${year}`,
        url: metas.get(META.URL),
        siteName: metas.get(META.SEO_SITE_TITLE),
        locale: "fr",
        type: "website",
      },
    };
  }
}

export default async function Page({ params }: Props) {
  const year = (await params).year;
  const session = await getSession();
  const items = await getItemsByYear(year, Type.SCULPTURE, !!session);

  return <ItemsPageComponent tag={year} items={items} type={Type.SCULPTURE} />;
}
