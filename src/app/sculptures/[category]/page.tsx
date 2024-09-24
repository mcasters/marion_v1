import ItemComponent from "@/components/item/ItemComponent";
import { getSculpturesFullByCategory } from "@/app/api/sculpture/getSculptures";
import s from "@/styles/ItemPage.module.css";

export default async function Page({
  params,
}: {
  params: { category: string };
}) {
  const sculptures = await getSculpturesFullByCategory(params.category);
  const categoryTitle =
    params.category === "no-category"
      ? "Sans catégorie"
      : sculptures[0]?.category?.value;

  return (
    <>
      <h2 className={s.categoryTitle}>{categoryTitle}</h2>
      {sculptures.map((sculpture) => (
        <ItemComponent key={sculpture.id} item={sculpture} />
      ))}
    </>
  );
}
