import ItemsComponent from "@/components/item/ItemsComponent";
import { getSession } from "@/app/lib/auth";
import { getCategory, getItemsByCategory } from "@/app/actions/items";
import { ItemLayout, Type } from "@/lib/type";
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
      title: `${metas.get(META.DOCUMENT_TITLE_SCULPTURE)} - ${text}`,
      description: `${metas.get(META.DESCRIPTION_SCULPTURE)} - ${text}`,
      openGraph: {
        title: `${metas.get(META.DOCUMENT_TITLE_SCULPTURE)} - ${text}`,
        description: `${metas.get(META.DESCRIPTION_SCULPTURE)} - ${text}`,
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
  const category = await getCategory(categoryKey, Type.SCULPTURE, !session);
  const items = await getItemsByCategory(categoryKey, Type.SCULPTURE, !session);

  return (
    <>
      {category && (
        <ItemsComponent
          tag={category.value}
          category={category}
          items={items}
          layout={ItemLayout.SCULPTURE}
        />
      )}
    </>
  );
}
