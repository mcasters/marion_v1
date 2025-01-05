import prisma from "@/lib/db/prisma";
import { OnlyString } from "@/lib/db/theme";
import { Theme } from "@prisma/client";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const id = parseInt((await params).id);
    const presetColor = await prisma.presetColor.findUnique({
      where: {
        id,
      },
    });

    if (presetColor) {
      const themes = await prisma.theme.findMany();
      const updatedThemes = [];
      for await (const theme of themes) {
        let updatedTheme = theme;
        let isModified = false;
        for await (const [key, value] of Object.entries(theme)) {
          if (
            value === presetColor.name &&
            key !== "name" &&
            key !== "isActive"
          ) {
            isModified = true;
            updatedTheme[key as keyof OnlyString<Theme>] = presetColor.color;
          }
        }
        if (isModified) updatedThemes.push(updatedTheme);
      }

      for await (const theme of updatedThemes) {
        const { id, ...rest } = theme;
        await prisma.theme.update({
          where: {
            id,
          },
          data: { ...rest },
        });
      }

      await prisma.presetColor.delete({
        where: { id },
      });

      const allThemes = await prisma.theme.findMany();
      const updatedPresetColors = await prisma.presetColor.findMany();

      return Response.json(
        {
          updatedThemes: JSON.parse(JSON.stringify(allThemes)),
          updatedPresetColors: JSON.parse(JSON.stringify(updatedPresetColors)),
        },
        { status: 200 },
      );
    }
  } catch (e) {
    console.log(e);
    return Response.json({ error: "Error" }, { status: 404 });
  }
}
