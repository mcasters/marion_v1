import { getDrawingCategoriesFull } from "@/app/api/dessin/category/getCategories";

export async function GET() {
  const res = await getDrawingCategoriesFull();
  return Response.json({ res }, { status: 200 });
}
