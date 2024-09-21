import ItemComponent from "@/components/item/ItemComponent";
import { getPaintingsFull } from "@/app/api/peinture/getPaintings";
import s from "@/styles/ItemPage.module.css";
import { PaintingFull } from "@/lib/db/item";

export default async function Page() {
  const paintings = await getPaintingsFull();
  return (
    <div className={s.grid}>
      {paintings.length > 0 &&
        paintings.map((painting: PaintingFull) => (
          <ItemComponent key={painting.id} item={painting} />
        ))}
    </div>
  );
}
