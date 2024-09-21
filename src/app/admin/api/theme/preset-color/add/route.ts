import { getServerSession } from "next-auth/next";

import prisma from "@/lib/db/prisma";
import { authOptions } from "@/utils/authOptions";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (session) {
    try {
      const presetColor = await req.json();
      let updatedPresetColors = null;

      const newPresetColor = await prisma.presetColor.create({
        data: {
          name: presetColor.name,
          color: presetColor.color,
        },
      });

      if (newPresetColor) {
        updatedPresetColors = await prisma.presetColor.findMany();
      }

      return NextResponse.json({
        updatedPresetColors: JSON.parse(JSON.stringify(updatedPresetColors)),
      });
    } catch (e) {
      console.log(e);
      return NextResponse.json({ error: "Error" }, { status: 404 });
    }
  } else {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
}
