import { getPostsFull } from "@/app/api/post/getPosts";

export async function GET() {
  const res = await getPostsFull();

  return Response.json({ res }, { status: 200 });
}
