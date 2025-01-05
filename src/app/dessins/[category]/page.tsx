import ItemComponent from "@/components/item/ItemComponent";
import s from "@/styles/ItemPage.module.css";
import { getDrawingsFullByCategory } from "@/app/api/dessin/getDrawings";

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
    <>
      <h2 className={s.categoryTitle}>{categoryTitle}</h2>
      {drawings.map((drawing) => (
        <ItemComponent key={drawing.id} item={drawing} />
      ))}
    </>
  );
}
