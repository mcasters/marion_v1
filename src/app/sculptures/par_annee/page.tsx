import ItemYearComponent from "@/components/item/ItemYearComponent";
import {
  getSculpturesFull,
  getYearsForSculpture,
} from "@/app/api/sculpture/getSculptures";

export default async function Page() {
  const sculptures = await getSculpturesFull();
  const years = await getYearsForSculpture();

  return <ItemYearComponent items={sculptures} years={years} />;
}
