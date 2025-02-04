import ItemYearComponent from "@/components/item/ItemYearComponent";

import {
  getSculpturesFull,
  getYearsForSculpture,
} from "@/app/actions/sculptures";
import s from "@/styles/ItemPage.module.css";

export default async function Page() {
  const sculptures = await getSculpturesFull();
  const years = await getYearsForSculpture();

  return (
    <div className={s.sculptureContent}>
      <ItemYearComponent items={sculptures} years={years} />
    </div>
  );
}
