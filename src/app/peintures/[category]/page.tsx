import s from "@/styles/ItemPage.module.css";
import { getPaintCategoryByKey } from "@/app/actions/paintings";
import ItemTagComponent from "@/components/item/ItemTagComponent";

type Props = {
  params: Promise<{ category: string }>;
};

export default async function Page({ params }: Props) {
  const categoryKey = (await params).category;
  const category = await getPaintCategoryByKey(categoryKey);

  return (
    <div className={s.paintingContent}>
      <ItemTagComponent tag={category.value} category={category} />;
    </div>
  );
}
