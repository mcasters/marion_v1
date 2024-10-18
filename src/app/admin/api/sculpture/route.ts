import { getSculpturesFull } from "@/app/api/sculpture/getSculptures";

export async function GET() {
  const res = await getSculpturesFull();
  return Response.json({ res }, { status: 200 });
}
