import { getDrawingsFull } from "@/app/api/dessin/getDrawings";

export async function GET() {
  const res = await getDrawingsFull();

  return Response.json({ res }, { status: 200 });
}
