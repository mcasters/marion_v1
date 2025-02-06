import ItemComponent from "@/components/item/ItemComponent";
import s from "@/styles/ItemPage.module.css";
import { getFullCategoryWithFullSculptures } from "@/app/actions/sculptures";

type Props = {
  params: Promise<{ category: string }>;
};

export default async function Page({ params }: Props) {
  const categoryKey = (await params).category;
  const category = await getFullCategoryWithFullSculptures(categoryKey);

  return (
    <div className={s.sculptureContent}>
      <h2 className={s.categoryValue}>{category.value}</h2>
      {categoryKey !== "no-category" && (
        <div className={s.categoryContent}>
          <p className={s.categoryTitle}>{category.content.title}</p>
          <p>{category.content.text}</p>
        </div>
      )}
      {category.items.map((sculpt) => (
        <ItemComponent key={sculpt.id} item={sculpt} />
      ))}
    </div>
  );
}
