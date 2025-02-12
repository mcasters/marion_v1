import { Type } from "@/lib/type";
import {
  getSculptureCategories,
  getYearsForSculpture,
} from "@/app/actions/sculptures";
import ItemHomeComponent from "@/components/item/ItemHomeComponent";

export default async function Page() {
  const categories = await getSculptureCategories();
  const years = await getYearsForSculpture();

  return (
    <ItemHomeComponent
      type={Type.SCULPTURE}
      categories={categories}
      years={years}
    />
  );
}
