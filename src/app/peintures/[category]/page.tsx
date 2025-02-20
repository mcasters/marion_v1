import s from "@/styles/ItemPage.module.css";
import ItemTagComponent from "@/components/item/ItemTagComponent";
import { getSession } from "@/app/lib/auth";
import { getCategoryByKey } from "@/app/actions/items";
import { Type } from "@/lib/type";

type Props = {
  params: Promise<{ category: string }>;
};

export default async function Page({ params }: Props) {
  const categoryKey = (await params).category;
  const session = await getSession();
  const category = await getCategoryByKey(Type.PAINTING, !session, categoryKey);

  return (
    <div className={s.paintingContent}>
      <ItemTagComponent tag={category.value} category={category} />
    </div>
  );
}
