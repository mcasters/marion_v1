import s from "@/styles/ItemPage.module.css";
import ItemTagComponent from "@/components/item/ItemTagComponent";
import { getSession } from "@/app/lib/auth";
import { getCategoryByKey, getItemsByCategory } from "@/app/actions/items";
import { Type } from "@/lib/type";

type Props = {
  params: Promise<{ category: string }>;
};

export default async function Page({ params }: Props) {
  const categoryKey = (await params).category;
  const session = await getSession();
  const category = await getCategoryByKey(categoryKey, Type.PAINTING, !session);
  const items = await getItemsByCategory(categoryKey, Type.PAINTING, !session);

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
