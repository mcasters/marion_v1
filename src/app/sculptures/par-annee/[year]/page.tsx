import ItemTagComponent from "@/components/item/ItemTagComponent";
import s from "@/styles/ItemPage.module.css";
import { getSession } from "@/app/lib/auth";
import { getItemsByYear } from "@/app/actions/items";
import { Type } from "@/lib/type";

type Props = {
  params: Promise<{ year: string }>;
};

export default async function Page({ params }: Props) {
  const year = (await params).year;
  const session = await getSession();
  const items = await getItemsByYear(year, Type.SCULPTURE, !session);

  return (
    <div className={s.sculptureContent}>
      <ItemTagComponent tag={year} items={items} />
    </div>
  );
}
