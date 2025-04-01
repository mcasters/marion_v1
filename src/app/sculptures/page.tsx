import { Type } from "@/lib/type";
import ItemHomeComponent from "@/components/item/itemHomeComponent";
import { getCategories, getYears } from "@/app/actions/items";

export default async function Page() {
  const categories = await getCategories(Type.SCULPTURE);
  const years = await getYears(Type.SCULPTURE);

  return (
    <ItemHomeComponent
      type={Type.SCULPTURE}
      categories={categories}
      years={years}
    />
  );
}
