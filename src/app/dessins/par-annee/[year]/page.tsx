import { getItemsByYear } from "@/app/actions/items";
import s from "@/styles/ItemPage.module.css";
import ItemTagComponent from "@/components/item/ItemTagComponent";
import { Type } from "@/lib/type";
import { getSession } from "@/app/lib/auth";

type Props = {
  params: Promise<{ year: string }>;
};

export default async function Page({ params }: Props) {
  const year = (await params).year;
  const session = await getSession();
  const items = await getItemsByYear(year, Type.DRAWING, !session);

  return (
    <div className={s.paintingContent}>
      <ItemTagComponent tag={year} items={items} />
    </div>
  );
}
