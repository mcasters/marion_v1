import { getSculptureCategoriesFull } from "@/app/api/sculpture/category/getCategories";

export async function GET() {
  const res = await getSculptureCategoriesFull();
  return Response.json({ res }, { status: 200 });
}
