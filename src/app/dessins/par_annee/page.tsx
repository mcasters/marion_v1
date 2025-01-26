import ItemYearComponent from "@/components/item/ItemYearComponent";

import { getDrawingsFull, getYearsForDrawing } from "@/app/actions/drawings";

export default async function Page() {
  const drawings = await getDrawingsFull();
  const years = await getYearsForDrawing();

  return <ItemYearComponent items={drawings} years={years} />;
}
