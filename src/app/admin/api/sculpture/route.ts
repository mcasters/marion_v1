import { getSculpturesFull } from "@/app/actions/sculptures";

export async function GET() {
  const res = await getSculpturesFull();
  return Response.json({ res }, { status: 200 });
}
