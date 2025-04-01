import { Type } from "@/lib/type";
import { getCategories, getYears } from "@/app/actions/items";
import ItemHomeComponent from "@/components/item/itemHomeComponent";

export default async function Page() {
  const categories = await getCategories(Type.DRAWING);
  const years = await getYears(Type.DRAWING);

  return (
    <ItemHomeComponent
      type={Type.DRAWING}
      categories={categories}
      years={years}
    />
  );
}
