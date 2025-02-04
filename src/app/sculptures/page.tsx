import ItemComponent from "@/components/item/ItemComponent";
import { ItemFull } from "@/lib/type";
import { getSculpturesFull } from "@/app/actions/sculptures";
import { getPaintingCategoriesFull } from "@/app/actions/paintings";
import ItemPageComponent from "@/components/item/ItemPageComponent";
import { TAGS } from "@/constants/specific/routes";

export default async function Page() {
  const sculptures: ItemFull[] = await getSculpturesFull();
  const categories = await getPaintingCategoriesFull();

  if (categories.length > 0)
    return <ItemPageComponent categories={categories} tag={TAGS.SCULPTURE} />;
  else
    return sculptures.map((sculpture: ItemFull) => (
      <ItemComponent key={sculpture.id} item={sculpture} />
    ));
}
