import { getItemsByYear } from "@/app/actions/items";
import ItemsComponent from "@/components/item/ItemsComponent";
import { Type } from "@/lib/type";
import { getSession } from "@/app/lib/auth";
import { Metadata } from "next";
import { getItemLayout, getMetaMap } from "@/utils/commonUtils";
import { getMetas } from "@/app/actions/meta";
import { META } from "@/constants/specific";

type Props = {
  params: Promise<{ year: string }>;
};

const metas = getMetaMap(await getMetas());

export async function generateMetadata({
  params,
}: Props): Promise<Metadata | undefined> {
  const year = (await params).year;
  if (metas) {
    return {
      title: `${metas.get(META.DOCUMENT_TITLE_DRAWING)} - Année ${year}`,
      description: `${metas.get(META.DESCRIPTION_DRAWING)} - Année ${year}`,
      openGraph: {
        title: `${metas.get(META.DOCUMENT_TITLE_DRAWING)} - Année ${year}`,
        description: `${metas.get(META.DESCRIPTION_DRAWING)} - Année ${year}`,
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
  const items = await getItemsByYear(year, Type.DRAWING, !session);

  return (
    <ItemsComponent
      tag={year}
      items={items}
      layout={getItemLayout(metas.get(META.DRAWING_LAYOUT))}
    />
  );
}
