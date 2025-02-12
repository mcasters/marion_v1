import { getDrawingsByYear } from "@/app/actions/drawings";
import ItemComponent from "@/components/item/ItemComponent";
import s from "@/styles/ItemPage.module.css";

type Props = {
  params: Promise<{ year: string }>;
};

export default async function Page({ params }: Props) {
  const year = (await params).year;
  const items = await getDrawingsByYear(year);

  return (
    <div className={s.paintingContent}>
      <div className={s.infoCategory}>
        <h2 className={`${s.yearTitle}`}>{year}</h2>
      </div>
      {items.map((item) => (
        <ItemComponent key={item.id} item={item} />
      ))}
    </div>
  );
}
