import { NextResponse } from "next/server";
import { getDrawingsFull } from "@/app/api/dessin/getDrawings";

export async function GET() {
  const res = await getDrawingsFull();

  return NextResponse.json({ res });
}
