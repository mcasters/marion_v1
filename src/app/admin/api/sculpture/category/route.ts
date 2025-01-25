import { getSculptureCategoriesFull } from "@/app/actions/sculptures";

export async function GET() {
  const res = await getSculptureCategoriesFull();
  return Response.json({ res }, { status: 200 });
}
