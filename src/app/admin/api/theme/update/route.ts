import prisma from "@/lib/db/prisma";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function POST(req: Request) {
  const session = await auth();
  if (session) {
    try {
      const themeToUpdate = await req.json();
      const { id, ...rest } = themeToUpdate;

      const updatedTheme = await prisma.theme.update({
        where: {
          id,
        },
        data: {
          ...rest,
        },
      });

      let themes = null;
      if (updatedTheme) themes = await prisma.theme.findMany();

      return NextResponse.json({
        themes: JSON.parse(JSON.stringify(themes)),
      });
    } catch (e) {
      console.log(e);
      return NextResponse.json({ error: "Error" }, { status: 404 });
    }
  } else {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
}
