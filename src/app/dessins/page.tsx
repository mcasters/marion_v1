import { Type } from "@/lib/type";
import { getCategories, getYears } from "@/app/actions/items";
import ItemHomeComponent from "@/components/item/itemHomeComponent";
import { getSession } from "@/app/lib/auth";

export default async function Page() {
  const session = await getSession();
  const categories = await getCategories(Type.DRAWING, !session);
  const years = await getYears(Type.DRAWING, !session);

  return (
    <ItemHomeComponent
      type={Type.DRAWING}
      categories={categories}
      years={years}
    />
  );
}
