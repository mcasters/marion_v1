import ItemYearComponent from "@/components/item/ItemYearComponent";
import { getPaintingsFull, getYearsForPainting } from "@/app/actions/paintings";
import s from "@/styles/ItemPage.module.css";

export default async function Page() {
  const paintings = await getPaintingsFull();
  const years = await getYearsForPainting();

  return (
    <div className={s.paintingContent}>
      <ItemYearComponent items={paintings} years={years} />
    </div>
  );
}
