import { getDrawingCategoriesFull } from "@/app/actions/drawings";

export async function GET() {
  const res = await getDrawingCategoriesFull();
  return Response.json({ res }, { status: 200 });
}
