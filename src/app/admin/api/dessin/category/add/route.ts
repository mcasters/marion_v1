import prisma from "@/lib/db/prisma";
import { transformValueToKey } from "@/utils/commonUtils";

export async function POST(req: Request) {
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
    return Response.json({ message: "ok" }, { status: 200 });
  } catch (e) {
    console.log(e);
    return Response.json({ error: "Error" }, { status: 404 });
  }
}
