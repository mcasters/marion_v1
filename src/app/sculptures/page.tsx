import ItemComponent from "@/components/item/ItemComponent";
import { getSculpturesFull } from "@/app/api/sculpture/getSculptures";
import { ItemFull, SculptureFull } from "@/lib/db/item";

export default async function Page() {
  const sculptures: ItemFull[] = await getSculpturesFull();

  return (
    sculptures.length > 0 &&
    sculptures.map((sculpture: SculptureFull) => (
      <ItemComponent key={sculpture.id} item={sculpture} />
    ))
  );
}
