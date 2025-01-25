import ItemYearComponent from "@/components/item/ItemYearComponent";

import {
  getSculpturesFull,
  getYearsForSculpture,
} from "@/app/actions/sculptures";

export default async function Page() {
  const sculptures = await getSculpturesFull();
  const years = await getYearsForSculpture();

  return <ItemYearComponent items={sculptures} years={years} />;
}
