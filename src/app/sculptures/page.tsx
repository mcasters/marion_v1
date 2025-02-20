import { Type } from "@/lib/type";
import ItemHomeComponent from "@/components/item/ItemHomeComponent";
import { getSession } from "@/app/lib/auth";
import { getCategories, getYears } from "@/app/actions/items";

export default async function Page() {
  const session = await getSession();
  const categories = await getCategories(Type.SCULPTURE, !session);
  const years = await getYears(Type.SCULPTURE, !session);

  return (
    <ItemHomeComponent
      type={Type.SCULPTURE}
      categories={categories}
      years={years}
    />
  );
}
