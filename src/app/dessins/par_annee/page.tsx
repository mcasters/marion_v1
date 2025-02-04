import ItemYearComponent from "@/components/item/ItemYearComponent";

import { getDrawingsFull, getYearsForDrawing } from "@/app/actions/drawings";
import s from "@/styles/ItemPage.module.css";

export default async function Page() {
  const drawings = await getDrawingsFull();
  const years = await getYearsForDrawing();

  return (
    <div className={s.paintingContent}>
      <ItemYearComponent items={drawings} years={years} />
    </div>
  );
}
