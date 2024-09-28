import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { getSculptureCategoriesFull } from "@/app/api/sculpture/category/getCategories";

export async function GET() {
  const session = await auth();

  if (session) {
    const res = await getSculptureCategoriesFull();
    return NextResponse.json({ res });
  } else {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
}
