import s from "@/styles/ItemPage.module.css";
import ItemTagComponent from "@/components/item/ItemTagComponent";
import { getSession } from "@/app/lib/auth";
import { getItemsByYear } from "@/app/actions";
import { Type } from "@/lib/type";

type Props = {
  params: Promise<{ year: string }>;
};

export default async function Page({ params }: Props) {
  const year = (await params).year;
  const session = await getSession();
  const items = await getItemsByYear(year, Type.PAINTING, !session);

  return (
    <div className={s.paintingContent}>
      <ItemTagComponent tag={year} items={items} />
    </div>
  );
}
