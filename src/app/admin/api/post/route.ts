import { getPostsFull } from "@/app/actions/posts";

export async function GET() {
  const res = await getPostsFull();

  return Response.json({ res }, { status: 200 });
}
