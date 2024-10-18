import prisma from "@/lib/db/prisma";
import { getBaseThemeData } from "@/utils/commonUtils";

export async function GET(req: Request) {
  try {
    let res;
    res = await prisma.theme.findMany();

    if (res.length === 0) {
      const defaultTheme = await prisma.theme.create({
        data: {
          ...getBaseThemeData(),
        },
      });
      res.push(defaultTheme);
    }
    return Response.json(
      { themes: JSON.parse(JSON.stringify(res)) },
      { status: 200 },
    );
  } catch (e) {
    console.log(e);
    return Response.json({ error: "Error" }, { status: 404 });
  }
}
