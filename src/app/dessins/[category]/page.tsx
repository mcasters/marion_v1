import ItemComponent from "@/components/item/ItemComponent";
import s from "@/styles/ItemPage.module.css";

import { getDrawingsFullByCategory } from "@/app/actions/drawings";

type Props = {
  params: Promise<{ category: string }>;
};

export default async function Page({ params }: Props) {
  const category = (await params).category;
  const drawings = await getDrawingsFullByCategory(category);
  const categoryTitle =
    category === "no-category"
      ? "Sans catégorie"
      : drawings[0]?.category?.value;

  return (
    <div className={s.paintingContent}>
      <h2 className={`${s.categoryTitle} ${s.paintingCategoryTitle}`}>
        {categoryTitle}
      </h2>
      {drawings.map((drawing) => (
        <ItemComponent key={drawing.id} item={drawing} />
      ))}
    </div>
  );
}
