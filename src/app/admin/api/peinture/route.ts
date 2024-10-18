import { getPaintingsFull } from "@/app/api/peinture/getPaintings";

export async function GET() {
  const res = await getPaintingsFull();

  return Response.json({ res }, { status: 200 });
}
