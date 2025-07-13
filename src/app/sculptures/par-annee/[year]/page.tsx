import ItemsPageComponent from "@/components/item/itemsPageComponent";
import { Type } from "@/lib/type";
import { Metadata } from "next";
import { getMetaMap } from "@/utils/commonUtils";
import { getMetas } from "@/app/actions/meta";
import { META } from "@/constants/admin";
import { getItemsByYear } from "@/app/actions/item-post";

type Props = {
  params: Promise<{ year: string }>;
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata | undefined> {
  const year = (await params).year;
  const metas = getMetaMap(await getMetas());
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
  const items = await getItemsByYear(year, Type.SCULPTURE);

  return <ItemsPageComponent tag={year} items={items} type={Type.SCULPTURE} />;
}
