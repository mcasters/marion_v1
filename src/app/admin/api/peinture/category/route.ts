import { getPaintingCategoriesFull } from "@/app/api/peinture/category/getCategories";

export async function GET() {
  const res = await getPaintingCategoriesFull();
  return Response.json({ res }, { status: 200 });
}
