import prisma from "@/lib/db/prisma";
import { NextResponse } from "next/server";
import { THEME } from "@/constants/database";

export async function POST(
  req: Request,
  { params }: { params: { id: string } },
) {
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
    return Response.json(
      {
        updatedThemes: JSON.parse(JSON.stringify(updatedThemes)),
      },
      { status: 200 },
    );
  } catch (e) {
    console.log(e);
    return Response.json({ error: "Error" }, { status: 404 });
  }
}
