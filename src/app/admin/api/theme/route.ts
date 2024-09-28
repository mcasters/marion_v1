import prisma from "@/lib/db/prisma";
import { NextResponse } from "next/server";
import { getBaseThemeData } from "@/utils/commonUtils";
import { auth } from "@/lib/auth";

export async function GET(req: Request) {
  const session = await auth();

  if (session) {
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
      return NextResponse.json({ themes: JSON.parse(JSON.stringify(res)) });
    } catch (e) {
      console.log(e);
      return NextResponse.json({ error: "Error" }, { status: 404 });
    }
  } else {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
}
