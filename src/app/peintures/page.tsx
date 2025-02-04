import ItemComponent from "@/components/item/ItemComponent";
import { ItemFull } from "@/lib/type";
import {
  getPaintingCategoriesFull,
  getPaintingsFull,
} from "@/app/actions/paintings";
import ItemPageComponent from "@/components/item/ItemPageComponent";
import { TAGS } from "@/constants/specific/routes";

export default async function Page() {
  const paintings = await getPaintingsFull();
  const categories = await getPaintingCategoriesFull();

  if (categories.length > 0)
    return <ItemPageComponent categories={categories} tag={TAGS.PAINTING} />;
  else
    return paintings.map((painting: ItemFull) => (
      <ItemComponent key={painting.id} item={painting} />
    ));
}
