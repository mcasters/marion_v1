import ItemTagComponent from "@/components/item/ItemTagComponent";
import s from "@/styles/ItemPage.module.css";
import { getSession } from "@/app/lib/auth";
import { getCategoryByKey } from "@/app/actions";
import { Type } from "@/lib/type";

type Props = {
  params: Promise<{ category: string }>;
};

export default async function Page({ params }: Props) {
  const categoryKey = (await params).category;
  const session = await getSession();
  const category = await getCategoryByKey(
    Type.SCULPTURE,
    !session,
    categoryKey,
  );

  return (
    <div className={s.sculptureContent}>
      <ItemTagComponent tag={category.value} category={category} />
    </div>
  );
}
