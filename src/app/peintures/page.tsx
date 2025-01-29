import ItemComponent from "@/components/item/ItemComponent";
import { ItemFull } from "@/lib/type";
import { getPaintingsFull } from "@/app/actions/paintings";

export default async function Page() {
  const paintings = await getPaintingsFull();
  return (
    paintings.length > 0 &&
    paintings.map((painting: ItemFull) => (
      <ItemComponent key={painting.id} item={painting} />
    ))
  );
}
