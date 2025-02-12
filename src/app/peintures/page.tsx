import { Type } from "@/lib/type";
import {
  getPaintingCategories,
  getYearsForPainting,
} from "@/app/actions/paintings";
import ItemHomeComponent from "@/components/item/ItemHomeComponent";

export default async function Page() {
  const categories = await getPaintingCategories();
  const years = await getYearsForPainting();

  return (
    <ItemHomeComponent
      type={Type.PAINTING}
      categories={categories}
      years={years}
    />
  );
}
