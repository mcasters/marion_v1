import ItemComponent from "@/components/item/ItemComponent";
import { ItemFull, Type } from "@/lib/type";
import { getFilledSculptureCategories } from "@/app/actions/sculptures";
import ItemPageComponent from "@/components/item/ItemPageComponent";
import s from "@/styles/ItemPage.module.css";

export default async function Page() {
  const categories = await getFilledSculptureCategories();

  if (categories.length > 0) {
    return <ItemPageComponent categories={categories} type={Type.SCULPTURE} />;
  } else
    return categories[0].items.map((sculpture: ItemFull) => (
      <div className={s.sculptureContent}>
        <ItemComponent key={sculpture.id} item={sculpture} />
      </div>
    ));
}
