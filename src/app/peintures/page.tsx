import { Type } from "@/lib/type";
import ItemHomeComponent from "@/components/item/itemHomeComponent";
import { getSession } from "@/app/lib/auth";
import { getCategories, getYears } from "@/app/actions/items";

export default async function Page() {
  const session = await getSession();
  const categories = await getCategories(Type.PAINTING, !!session);
  const years = await getYears(Type.PAINTING, !!session);

  return (
    <ItemHomeComponent
      type={Type.PAINTING}
      categories={categories}
      years={years}
    />
  );
}
