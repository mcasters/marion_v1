import ItemComponent from "@/components/item/ItemComponent";
import { DrawingFull } from "@/lib/db/item";
import { getDrawingsFull } from "@/app/api/dessin/getDrawings";

export default async function Page() {
  const drawings = await getDrawingsFull();
  return (
    drawings.length > 0 &&
    drawings.map((drawing: DrawingFull) => (
      <ItemComponent key={drawing.id} item={drawing} />
    ))
  );
}
