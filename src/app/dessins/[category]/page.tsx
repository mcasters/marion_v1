import ItemComponent from "@/components/item/ItemComponent";
import s from "@/styles/ItemPage.module.css";
import { getDrawingsFullByCategory } from "@/app/api/dessin/getDrawings";

export default async function Page({
  params,
}: {
  params: { category: string };
}) {
  const drawings = await getDrawingsFullByCategory(params.category);
  const categoryTitle =
    params.category === "no-category"
      ? "Sans catégorie"
      : drawings[0]?.category?.value;
  return (
    <>
      <h2 className={s.categoryTitle}>{categoryTitle}</h2>
      <div className={s.grid}>
        {drawings.map((drawing) => (
          <ItemComponent key={drawing.id} item={drawing} />
        ))}
      </div>
    </>
  );
}
