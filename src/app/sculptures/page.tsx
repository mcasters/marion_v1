import ItemComponent from "@/components/item/ItemComponent";
import { ItemFull } from "@/lib/db/item";
import { getSculpturesFull } from "@/app/actions/sculptures";

export default async function Page() {
  const sculptures: ItemFull[] = await getSculpturesFull();

  return (
    sculptures.length > 0 &&
    sculptures.map((sculpture: ItemFull) => (
      <ItemComponent key={sculpture.id} item={sculpture} />
    ))
  );
}
