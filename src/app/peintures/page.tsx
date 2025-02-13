import { Type } from "@/lib/type";
import { getPaintCategories, getYearsForPaint } from "@/app/actions/paintings";
import ItemHomeComponent from "@/components/item/ItemHomeComponent";

export default async function Page() {
  const categories = await getPaintCategories();
  const years = await getYearsForPaint();

  return (
    <ItemHomeComponent
      type={Type.PAINTING}
      categories={categories}
      years={years}
    />
  );
}
