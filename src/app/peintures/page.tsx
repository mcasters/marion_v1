import { ItemFull, Type } from "@/lib/type";
import {
  getFilledPaintingCategories,
  getPaintingsFull,
  getYearsForPainting,
} from "@/app/actions/paintings";
import ItemPageComponent from "@/components/item/ItemPageComponent";

export default async function Page() {
  const categories = await getFilledPaintingCategories();
  let items: ItemFull[] = [];
  if (categories.length === 0) items = await getPaintingsFull();
  const years = await getYearsForPainting();

  return (
    <ItemPageComponent
      categories={categories}
      type={Type.PAINTING}
      itemsWhenNoCategory={items}
      years={years}
    />
  );
}
