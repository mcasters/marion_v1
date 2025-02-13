import { Type } from "@/lib/type";
import { getDrawCategories, getYearsForDraw } from "@/app/actions/drawings";
import ItemHomeComponent from "@/components/item/ItemHomeComponent";

export default async function Page() {
  const categories = await getDrawCategories();
  const years = await getYearsForDraw();

  return (
    <ItemHomeComponent
      type={Type.DRAWING}
      categories={categories}
      years={years}
    />
  );
}
