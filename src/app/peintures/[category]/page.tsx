import ItemComponent from "@/components/item/ItemComponent";
import s from "@/styles/ItemPage.module.css";
import { getFullCategoryWithFullPaintings } from "@/app/actions/paintings";

type Props = {
  params: Promise<{ category: string }>;
};

export default async function Page({ params }: Props) {
  const categoryKey = (await params).category;
  const category = await getFullCategoryWithFullPaintings(categoryKey);

  return (
    <div className={s.paintingContent}>
      <h2 className={`${s.categoryValue} ${s.paintingCategoryTitle}`}>
        {category.value}
      </h2>
      {categoryKey !== "no-category" && (
        <div className={s.categoryContent}>
          <p className={s.categoryTitle}>{category.content.title}</p>
          <p>{category.content.text}</p>
        </div>
      )}
      {category.items.map((painting) => (
        <ItemComponent key={painting.id} item={painting} />
      ))}
    </div>
  );
}
