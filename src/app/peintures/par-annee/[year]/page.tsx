import s from "@/styles/ItemPage.module.css";
import { getPaintingsByYear } from "@/app/actions/paintings";
import ItemTagComponent from "@/components/item/ItemTagComponent";

type Props = {
  params: Promise<{ year: string }>;
};

export default async function Page({ params }: Props) {
  const year = (await params).year;
  const items = await getPaintingsByYear(year);

  return (
    <div className={s.paintingContent}>
      <ItemTagComponent tag={year} items={items} />
    </div>
  );
}
