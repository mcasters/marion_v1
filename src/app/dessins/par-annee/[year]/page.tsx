import { getDrawingsByYear } from "@/app/actions/drawings";
import s from "@/styles/ItemPage.module.css";
import ItemTagComponent from "@/components/item/ItemTagComponent";

type Props = {
  params: Promise<{ year: string }>;
};

export default async function Page({ params }: Props) {
  const year = (await params).year;
  const items = await getDrawingsByYear(year);

  return (
    <div className={s.paintingContent}>
      <ItemTagComponent tag={year} items={items} />
    </div>
  );
}
