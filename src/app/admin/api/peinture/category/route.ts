import { getPaintingCategoriesFull } from "@/app/actions/paintings/category";

export async function GET() {
  const res = await getPaintingCategoriesFull();
  return Response.json({ res }, { status: 200 });
}
