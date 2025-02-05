import ItemComponent from "@/components/item/ItemComponent";
import { ItemFull, Type } from "@/lib/type";
import {
  getSculptureCategoriesFull,
  getSculpturesFull,
} from "@/app/actions/sculptures";
import ItemPageComponent from "@/components/item/ItemPageComponent";
import s from "@/styles/ItemPage.module.css";

export default async function Page() {
  const sculptures: ItemFull[] = await getSculpturesFull();
  const categories = await getSculptureCategoriesFull();

  if (categories.length > 0) {
    return <ItemPageComponent categories={categories} type={Type.SCULPTURE} />;
  } else
    return sculptures.map((sculpture: ItemFull) => (
      <div className={s.sculptureContent}>
        <ItemComponent key={sculpture.id} item={sculpture} />
      </div>
    ));
}
