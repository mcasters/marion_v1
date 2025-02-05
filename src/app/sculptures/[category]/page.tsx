import ItemComponent from "@/components/item/ItemComponent";
import s from "@/styles/ItemPage.module.css";
import { getSculpturesFullByCategory } from "@/app/actions/sculptures";

type Props = {
  params: Promise<{ category: string }>;
};

export default async function Page({ params }: Props) {
  const category = (await params).category;
  const sculptures = await getSculpturesFullByCategory(category);
  const categoryTitle =
    category === "no-category"
      ? "Sans catégorie"
      : sculptures[0]?.category?.value;

  return (
    <div className={s.sculptureContent}>
      <h2 className={s.categoryTitle}>{categoryTitle}</h2>
      {sculptures.map((sculpture) => (
        <ItemComponent key={sculpture.id} item={sculpture} />
      ))}
    </div>
  );
}
