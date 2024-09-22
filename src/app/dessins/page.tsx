import ItemComponent from "@/components/item/ItemComponent";
import s from "@/styles/ItemPage.module.css";
import { DrawingFull } from "@/lib/db/item";
import { getDrawingsFull } from "@/app/api/dessin/getDrawings";

export default async function Page() {
  const drawings = await getDrawingsFull();
  return (
    <div className={s.grid}>
      {drawings.length > 0 &&
        drawings.map((drawing: DrawingFull) => (
          <ItemComponent key={drawing.id} item={drawing} />
        ))}
    </div>
  );
}
