import s from "@/styles/ItemPage.module.css";
import ItemTagComponent from "@/components/item/ItemTagComponent";
import { getSession } from "@/app/lib/auth";
import { getItemsByYear } from "@/app/actions/items";
import { Type } from "@/lib/type";
import { getMetaMap } from "@/utils/commonUtils";
import { getMetas } from "@/app/actions/meta";
import { Metadata } from "next";
import { META } from "@/constants/specific";

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
      title: `${metas.get(META.DOCUMENT_TITLE_PAINTING)} - Année ${year}`,
      description: `${metas.get(META.DESCRIPTION_PAINTING)} - Année ${year}`,
      openGraph: {
        title: `${metas.get(META.DOCUMENT_TITLE_PAINTING)} - Année ${year}`,
        description: `${metas.get(META.DESCRIPTION_PAINTING)} - Année ${year}`,
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
  const items = await getItemsByYear(year, Type.PAINTING, !session);

  return (
    <div className={s.paintingContent}>
      <ItemTagComponent tag={year} items={items} />
    </div>
  );
}
