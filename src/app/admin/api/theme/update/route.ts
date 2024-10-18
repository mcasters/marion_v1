import prisma from "@/lib/db/prisma";

export async function POST(req: Request) {
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

    return Response.json(
      {
        themes: JSON.parse(JSON.stringify(themes)),
      },
      { status: 200 },
    );
  } catch (e) {
    console.log(e);
    return Response.json({ error: "Error" }, { status: 404 });
  }
}
