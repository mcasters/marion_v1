import ItemYearComponent from "@/components/item/ItemYearComponent";
import { getPaintingsFull, getYearsForPainting } from "@/app/actions/paintings";

export default async function Page() {
  const paintings = await getPaintingsFull();
  const years = await getYearsForPainting();

  return <ItemYearComponent items={paintings} years={years} />;
}
