import ItemComponent from "@/components/item/ItemComponent";
import { getPaintingsFullByCategory } from "@/app/api/peinture/getPaintings";
import s from "@/styles/ItemPage.module.css";

export default async function Page({
  params,
}: {
  params: { category: string };
}) {
  const paintings = await getPaintingsFullByCategory(params.category);
  const categoryTitle =
    params.category === "no-category"
      ? "Sans catégorie"
      : paintings[0]?.category?.value;
  return (
    <>
      <h2 className={`${s.categoryTitle} ${s.paintingCategoryTitle}`}>
        {categoryTitle}
      </h2>
      {paintings.map((painting) => (
        <ItemComponent key={painting.id} item={painting} />
      ))}
    </>
  );
}
