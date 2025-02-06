import ItemComponent from "@/components/item/ItemComponent";
import { ItemFull, Type } from "@/lib/type";
import { getFilledPaintingCategories } from "@/app/actions/paintings";
import ItemPageComponent from "@/components/item/ItemPageComponent";
import s from "@/styles/ItemPage.module.css";

export default async function Page() {
  const categories = await getFilledPaintingCategories();

  if (categories.length > 0)
    return <ItemPageComponent categories={categories} type={Type.PAINTING} />;
  else
    return categories[0].items.map((painting: ItemFull) => (
      <div className={s.paintingContent}>
        <ItemComponent key={painting.id} item={painting} />
      </div>
    ));
}
