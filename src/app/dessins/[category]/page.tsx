import s from "@/styles/ItemPage.module.css";
import { getCategoryByKey } from "@/app/actions/items";
import ItemTagComponent from "@/components/item/ItemTagComponent";
import { Type } from "@/lib/type";
import { getSession } from "@/app/lib/auth";

type Props = {
  params: Promise<{ category: string }>;
};

export default async function Page({ params }: Props) {
  const categoryKey = (await params).category;
  const session = await getSession();
  const category = await getCategoryByKey(Type.DRAWING, !session, categoryKey);

  return (
    <div className={s.paintingContent}>
      <ItemTagComponent tag={category.value} category={category} />
    </div>
  );
}
