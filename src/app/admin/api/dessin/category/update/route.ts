import { getServerSession } from "next-auth/next";
import prisma from "@/lib/db/prisma";
import { authOptions } from "@/utils/authOptions";
import { transformValueToKey } from "@/utils/commonUtils";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (session) {
    try {
      const formData = await req.formData();
      const id = Number(formData.get("id"));
      const value = formData.get("text") as string;
      const key = transformValueToKey(value);

      const updatedPaint = await prisma.drawingCategory.update({
        where: { id },
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
