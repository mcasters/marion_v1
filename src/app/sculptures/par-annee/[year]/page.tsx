import { getSculpturesByYear } from "@/app/actions/sculptures";
import ItemTagComponent from "@/components/item/ItemTagComponent";
import s from "@/styles/ItemPage.module.css";

type Props = {
  params: Promise<{ year: string }>;
};

export default async function Page({ params }: Props) {
  const year = (await params).year;
  const items = await getSculpturesByYear(year);

  return (
    <div className={s.sculptureContent}>
      <ItemTagComponent tag={year} items={items} />
    </div>
  );
}
