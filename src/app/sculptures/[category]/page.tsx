import ItemComponent from "@/components/item/ItemComponent";
import s from "@/styles/ItemPage.module.css";
import { getCategoryWithItemsByKey } from "@/app/actions/drawings";

type Props = {
  params: Promise<{ category: string }>;
};

export default async function Page({ params }: Props) {
  const categoryKey = (await params).category;
  const category = await getCategoryWithItemsByKey(categoryKey);

  return (
    <div className={s.paintingContent}>
      <div className={s.infoCategory}>
        <h2 className={`${s.categoryValue}`}>{category.value}</h2>
        <div className={s.categoryContent}>
          <h4>{category.content.title}</h4>
          <p>{category.content.text}</p>
        </div>
      </div>
      {category.items.map((drawing) => (
        <ItemComponent key={drawing.id} item={drawing} />
      ))}
    </div>
  );
}
