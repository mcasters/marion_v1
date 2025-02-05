import ItemComponent from "@/components/item/ItemComponent";
import { ItemFull, Type } from "@/lib/type";
import {
  getPaintingCategoriesFull,
  getPaintingsFull,
} from "@/app/actions/paintings";
import ItemPageComponent from "@/components/item/ItemPageComponent";
import s from "@/styles/ItemPage.module.css";

export default async function Page() {
  const paintings = await getPaintingsFull();
  const categories = await getPaintingCategoriesFull();

  if (categories.length > 0)
    return <ItemPageComponent categories={categories} type={Type.PAINTING} />;
  else
    return paintings.map((painting: ItemFull) => (
      <div className={s.paintingContent}>
        <ItemComponent key={painting.id} item={painting} />
      </div>
    ));
}
