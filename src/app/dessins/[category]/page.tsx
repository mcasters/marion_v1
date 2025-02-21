import s from "@/styles/ItemPage.module.css";
import { getCategory, getItemsByCategory } from "@/app/actions/items";
import ItemTagComponent from "@/components/item/ItemTagComponent";
import { Type } from "@/lib/type";
import { getSession } from "@/app/lib/auth";

type Props = {
  params: Promise<{ category: string }>;
};

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
