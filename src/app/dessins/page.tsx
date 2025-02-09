import { ItemFull, Type } from "@/lib/type";
import {
  getDrawingsFull,
  getFilledDrawingCategories,
  getYearsForDrawing,
} from "@/app/actions/drawings";
import ItemPageComponent from "@/components/item/ItemPageComponent";

export default async function Page() {
  const categories = await getFilledDrawingCategories();
  let items: ItemFull[] = [];
  if (categories.length === 0) items = await getDrawingsFull();
  const years = await getYearsForDrawing();

  return (
    <ItemPageComponent
      type={Type.DRAWING}
      categories={categories}
      itemsWhenNoCategory={items}
      years={years}
    />
  );
}
