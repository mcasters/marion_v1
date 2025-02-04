import ItemComponent from "@/components/item/ItemComponent";
import { ItemFull } from "@/lib/type";

import {
  getDrawingCategoriesFull,
  getDrawingsFull,
} from "@/app/actions/drawings";
import ItemPageComponent from "@/components/item/ItemPageComponent";
import { TAGS } from "@/constants/specific/routes";

export default async function Page() {
  const drawings = await getDrawingsFull();
  const categories = await getDrawingCategoriesFull();

  if (categories.length > 0)
    return <ItemPageComponent categories={categories} tag={TAGS.DRAWING} />;
  else
    return drawings.map((drawing: ItemFull) => (
      <ItemComponent key={drawing.id} item={drawing} />
    ));
}
