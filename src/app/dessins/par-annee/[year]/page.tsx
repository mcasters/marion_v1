import { getItemsByYear } from "@/app/actions/drawings";
import ItemComponent from "@/components/item/ItemComponent";
import s from "@/styles/ItemPage.module.css";

type Props = {
  params: Promise<{ year: string }>;
};

export default async function Page({ params }: Props) {
  const year = (await params).year;
  const items = await getItemsByYear(year);

  console.log("///params");
  console.log(year);
  return (
    <div className={s.paintingContent}>
      <div className={s.infoCategory}>
        <h2 className={`${s.categoryValue}`}>{year}</h2>
      </div>
      {items.map((drawing) => (
        <ItemComponent key={drawing.id} item={drawing} />
      ))}
    </div>
  );
}
