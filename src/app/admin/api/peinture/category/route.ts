import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getPaintingCategoriesFull } from "@/app/api/peinture/category/getCategories";

export async function GET() {
  const session = await auth();

  if (session) {
    const res = await getPaintingCategoriesFull();
    return NextResponse.json({ res });
  } else {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
}
