import ItemComponent from "@/components/item/ItemComponent";
import { ItemFull, Type } from "@/lib/type";

import { getFilledDrawingCategories } from "@/app/actions/drawings";
import ItemPageComponent from "@/components/item/ItemPageComponent";
import s from "@/styles/ItemPage.module.css";

export default async function Page() {
  const categories = await getFilledDrawingCategories();

  if (categories.length > 0)
    return <ItemPageComponent categories={categories} type={Type.DRAWING} />;
  else
    return categories[0].items.map((drawing: ItemFull) => (
      <div className={s.paintingContent}>
        <ItemComponent key={drawing.id} item={drawing} />
      </div>
    ));
}
