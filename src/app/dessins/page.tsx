import { ItemFull, Type } from "@/lib/type";
import {
  getDrawingsFull,
  getFilledDrawingCategories,
} from "@/app/actions/drawings";
import ItemPageComponent from "@/components/item/ItemPageComponent";

export default async function Page() {
  const categories = await getFilledDrawingCategories();
  let items: ItemFull[] = [];
  if (categories.length === 0) items = await getDrawingsFull();

  return (
    <ItemPageComponent
      categories={categories}
      type={Type.DRAWING}
      itemsWhenNoCategory={items}
    />
  );
}
