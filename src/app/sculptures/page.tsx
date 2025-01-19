import ItemComponent from "@/components/item/ItemComponent";
import { getSculpturesFull } from "@/app/api/sculpture/getSculptures";
import { ItemFull } from "@/lib/db/item";

export default async function Page() {
  const sculptures: ItemFull[] = await getSculpturesFull();

  return (
    sculptures.length > 0 &&
    sculptures.map((sculpture: ItemFull) => (
      <ItemComponent key={sculpture.id} item={sculpture} />
    ))
  );
}
