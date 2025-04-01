import { Type } from "@/lib/type";
import ItemHomeComponent from "@/components/item/itemHomeComponent";
import { getCategories, getYears } from "@/app/actions/items";

export default async function Page() {
  const categories = await getCategories(Type.PAINTING);
  const years = await getYears(Type.PAINTING);

  return (
    <ItemHomeComponent
      type={Type.PAINTING}
      categories={categories}
      years={years}
    />
  );
}
