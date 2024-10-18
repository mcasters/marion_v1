import prisma from "@/lib/db/prisma";
import { getBasePresetColorData } from "@/utils/commonUtils";

export async function GET(req: Request) {
  try {
    let res;
    res = await prisma.presetColor.findMany();

    if (res.length === 0) {
      const defaultPresetColor = await prisma.presetColor.create({
        data: {
          ...getBasePresetColorData(),
        },
      });
      res.push(defaultPresetColor);
    }
    return Response.json(
      {
        presetColors: JSON.parse(JSON.stringify(res)),
      },
      { status: 200 },
    );
  } catch (e) {
    console.log(e);
    return Response.json({ error: "Error" }, { status: 404 });
  }
}
