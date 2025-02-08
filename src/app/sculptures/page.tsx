import { ItemFull, Type } from "@/lib/type";
import {
  getFilledSculptureCategories,
  getSculpturesFull,
} from "@/app/actions/sculptures";
import ItemPageComponent from "@/components/item/ItemPageComponent";

export default async function Page() {
  const categories = await getFilledSculptureCategories();
  let items: ItemFull[] = [];
  if (categories.length === 0) items = await getSculpturesFull();

  return (
    <ItemPageComponent
      categories={categories}
      type={Type.SCULPTURE}
      itemsWhenNoCategory={items}
    />
  );
}
