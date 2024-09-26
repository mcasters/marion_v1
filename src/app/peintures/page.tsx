import ItemComponent from "@/components/item/ItemComponent";
import { getPaintingsFull } from "@/app/api/peinture/getPaintings";
import { PaintingFull } from "@/lib/db/item";

export default async function Page() {
  const paintings = await getPaintingsFull();
  return (
    paintings.length > 0 &&
    paintings.map((painting: PaintingFull) => (
      <ItemComponent key={painting.id} item={painting} />
    ))
  );
}
