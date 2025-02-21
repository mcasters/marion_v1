import ItemTagComponent from "@/components/item/ItemTagComponent";
import s from "@/styles/ItemPage.module.css";
import { getSession } from "@/app/lib/auth";
import { getCategory, getItemsByCategory } from "@/app/actions/items";
import { Type } from "@/lib/type";

type Props = {
  params: Promise<{ category: string }>;
};

export default async function Page({ params }: Props) {
  const categoryKey = (await params).category;
  const session = await getSession();
  const category = await getCategory(categoryKey, Type.SCULPTURE, !session);
  const items = await getItemsByCategory(categoryKey, Type.SCULPTURE, !session);

  return (
    <div className={s.sculptureContent}>
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
