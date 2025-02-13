import { getSculptCategoryByKey } from "@/app/actions/sculptures";
import ItemTagComponent from "@/components/item/ItemTagComponent";
import s from "@/styles/itemPage.module.css";

type Props = {
  params: Promise<{ category: string }>;
};

export default async function Page({ params }: Props) {
  const categoryKey = (await params).category;
  const category = await getSculptCategoryByKey(categoryKey);

  return (
    <div className={s.sculptureContent}>
      <ItemTagComponent tag={category.value} category={category} />;
    </div>
  );
}
