import { Type } from "@/lib/type";
import {
  getSculptCategories,
  getYearsForSculpt,
} from "@/app/actions/sculptures";
import ItemHomeComponent from "@/components/item/ItemHomeComponent";

export default async function Page() {
  const categories = await getSculptCategories();
  const years = await getYearsForSculpt();

  return (
    <ItemHomeComponent
      type={Type.SCULPTURE}
      categories={categories}
      years={years}
    />
  );
}
