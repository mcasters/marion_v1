import { getServerSession } from "next-auth/next";

import prisma from "@/lib/db/prisma";
import { authOptions } from "@/utils/authOptions";
import { NextResponse } from "next/server";
import { THEME } from "@/constants/database";

export async function POST(
  req: Request,
  { params }: { params: { id: string } },
) {
  const session = await getServerSession(authOptions);

  if (session) {
    try {
      const id = parseInt(params.id);
      let updatedThemes = null;

      const themeToDelete = await prisma.theme.findUnique({
        where: {
          id,
        },
      });

      if (themeToDelete) {
        if (themeToDelete.name === THEME.BASE_THEME) {
          return NextResponse.json(
            { error: "le thème par défaut ne peut pas être supprimé" },
            { status: 404 },
          );
        }
        if (themeToDelete.isActive) {
          await prisma.theme.update({
            where: {
              name: THEME.BASE_THEME,
            },
            data: {
              isActive: true,
            },
          });
        }

        await prisma.theme.delete({
          where: { id },
        });
        updatedThemes = await prisma.theme.findMany();
      }
      return NextResponse.json({
        updatedThemes: JSON.parse(JSON.stringify(updatedThemes)),
      });
    } catch (e) {
      console.log(e);
      return NextResponse.json({ error: "Error" }, { status: 404 });
    }
  } else {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
}
