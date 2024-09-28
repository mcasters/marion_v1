import { NextResponse } from "next/server";
import { getDrawingCategoriesFull } from "@/app/api/dessin/category/getCategories";
import { auth } from "@/lib/auth";

export async function GET() {
  const session = await auth();

  if (session) {
    const res = await getDrawingCategoriesFull();
    return NextResponse.json({ res });
  } else {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
}
