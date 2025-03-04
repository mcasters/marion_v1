import s from "@/styles/ItemPage.module.css";
import { getCategory, getItemsByCategory } from "@/app/actions/items";
import ItemTagComponent from "@/components/item/ItemTagComponent";
import { Type } from "@/lib/type";
import { getSession } from "@/app/lib/auth";
import { Metadata } from "next";
import { getMetaMap } from "@/utils/commonUtils";
import { getMetas } from "@/app/actions/meta";
import { META } from "@/constants/specific";

type Props = {
  params: Promise<{ category: string }>;
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata | undefined> {
  const metas = getMetaMap(await getMetas());
  const session = await getSession();
  const categoryKey = (await params).category;
  const category = await getCategory(categoryKey, Type.PAINTING, !session);

  if (metas && category) {
    const text =
      category.value === "Sans catégorie"
        ? category.value
        : `Catégorie ${category.value}`;
    return {
      title: `${metas.get(META.DOCUMENT_TITLE_DRAWING)} - ${text}`,
      description: `${metas.get(META.DESCRIPTION_DRAWING)} - ${text}`,
      openGraph: {
        title: `${metas.get(META.DOCUMENT_TITLE_DRAWING)} - ${text}`,
        description: `${metas.get(META.DESCRIPTION_DRAWING)} - ${text}`,
        url: metas.get(META.URL),
        siteName: metas.get(META.SEO_SITE_TITLE),
        locale: "fr",
        type: "website",
      },
    };
  }
}

export default async function Page({ params }: Props) {
  const categoryKey = (await params).category;
  const session = await getSession();
  const category = await getCategory(categoryKey, Type.DRAWING, !session);
  const items = await getItemsByCategory(categoryKey, Type.DRAWING, !session);

  return (
    <div className={s.paintingContent}>
      {category && (
        <ItemTagComponent
          tag={category.value}
          category={category}
          items={items}
        />
      )}
    </div>
  );
}
