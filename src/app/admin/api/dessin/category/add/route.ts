import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/db/prisma";
import { transformValueToKey } from "@/utils/commonUtils";

export async function POST(req: Request) {
  const session = await auth();

  if (session) {
    try {
      const formData = await req.formData();
      const value = formData.get("text") as string;
      const key = transformValueToKey(value);

      const newCategory = await prisma.drawingCategory.create({
        data: {
          key,
          value,
        },
      });
      return NextResponse.json({ message: "ok" }, { status: 200 });
    } catch (e) {
      console.log(e);
      return NextResponse.json({ error: "Error" }, { status: 404 });
    }
  } else {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
}
