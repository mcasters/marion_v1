import ItemComponent from "@/components/item/ItemComponent";
import { getPaintingsFull } from "@/app/api/peinture/getPaintings";
import { ItemFull } from "@/lib/db/item";

export default async function Page() {
  const paintings = await getPaintingsFull();
  return (
    paintings.length > 0 &&
    paintings.map((painting: ItemFull) => (
      <ItemComponent key={painting.id} item={painting} />
    ))
  );
}
