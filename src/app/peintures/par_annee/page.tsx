import {
  getPaintingsFull,
  getYearsForPainting,
} from "@/app/api/peinture/getPaintings";
import ItemYearComponent from "@/components/item/ItemYearComponent";

export default async function Page() {
  const paintings = await getPaintingsFull();
  const years = await getYearsForPainting();

  return <ItemYearComponent items={paintings} years={years} />;
}
