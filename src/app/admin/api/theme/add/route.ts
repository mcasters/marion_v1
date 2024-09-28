import prisma from "@/lib/db/prisma";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await auth();
  if (session) {
    try {
      const theme = await req.json();
      const { id, isActive, ...rest } = theme;
      let themes = null;

      const newTheme = await prisma.theme.create({
        data: {
          isActive: false,
          ...rest,
        },
      });

      if (newTheme) {
        themes = await prisma.theme.findMany();
      }

      return NextResponse.json({
        themes: JSON.parse(JSON.stringify(themes)),
        newTheme: JSON.parse(JSON.stringify(newTheme)),
      });
    } catch (e) {
      console.log(e);
      return NextResponse.json({ error: "Error" }, { status: 404 });
    }
  } else {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
}
