import ItemComponent from "@/components/item/ItemComponent";
import { ItemFull } from "@/lib/type";

import { getDrawingsFull } from "@/app/actions/drawings";

export default async function Page() {
  const drawings = await getDrawingsFull();
  return (
    drawings.length > 0 &&
    drawings.map((drawing: ItemFull) => (
      <ItemComponent key={drawing.id} item={drawing} />
    ))
  );
}
