import ItemComponent from "@/components/item/ItemComponent";
import s from "@/styles/ItemPage.module.css";
import { getPaintCategoryByKey } from "@/app/actions/paintings";

type Props = {
  params: Promise<{ category: string }>;
};

export default async function Page({ params }: Props) {
  const categoryKey = (await params).category;
  const category = await getPaintCategoryByKey(categoryKey);

  console.log(category);
  return (
    <div className={s.paintingContent}>
      <div className={s.infoCategory}>
        <h2 className={`${s.categoryValue}`}>{category.value}</h2>
        <div className={s.categoryContent}>
          <h4>{category.content.title}</h4>
          <p>{category.content.text}</p>
        </div>
      </div>
      {category.items.map((item) => (
        <ItemComponent key={item.id} item={item} />
      ))}
    </div>
  );
}
