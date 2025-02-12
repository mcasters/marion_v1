import { Type } from "@/lib/type";
import {
  getDrawingCategories,
  getYearsForDrawing,
} from "@/app/actions/drawings";
import ItemHomeComponent from "@/components/item/ItemHomeComponent";

export default async function Page() {
  const categories = await getDrawingCategories();
  const years = await getYearsForDrawing();

  return (
    <ItemHomeComponent
      type={Type.DRAWING}
      categories={categories}
      years={years}
    />
  );
}
