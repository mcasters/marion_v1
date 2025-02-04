import ItemComponent from "@/components/item/ItemComponent";
import s from "@/styles/ItemPage.module.css";
import { getPaintingsFullByCategory } from "@/app/actions/paintings";

type Props = {
  params: Promise<{ category: string }>;
};

export default async function Page({ params }: Props) {
  const category = (await params).category;
  const paintings = await getPaintingsFullByCategory(category);
  const categoryTitle =
    category === "no-category"
      ? "Sans catégorie"
      : paintings[0]?.category?.value;
  return (
    <div className={s.paintingContent}>
      <h2 className={`${s.categoryTitle} ${s.paintingCategoryTitle}`}>
        {categoryTitle}
      </h2>
      {paintings.map((painting) => (
        <ItemComponent key={painting.id} item={painting} />
      ))}
    </div>
  );
}
