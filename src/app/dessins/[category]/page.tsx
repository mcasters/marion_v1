import ItemComponent from "@/components/item/ItemComponent";
import s from "@/styles/ItemPage.module.css";

import { getFullCategoryWithFullDrawings } from "@/app/actions/drawings";

type Props = {
  params: Promise<{ category: string }>;
};

export default async function Page({ params }: Props) {
  const categoryKey = (await params).category;
  const category = await getFullCategoryWithFullDrawings(categoryKey);

  return (
    <div className={s.paintingContent}>
      <h2 className={`${s.categoryValue} ${s.paintingCategoryTitle}`}>
        {category.value}
      </h2>
      <div className={s.categoryContent}>
        <p className={s.categoryTitle}>title : {category.content.title}</p>
        <p>texte : {category.content.text}</p>
      </div>
      {category.items.map((drawing) => (
        <ItemComponent key={drawing.id} item={drawing} />
      ))}
    </div>
  );
}
