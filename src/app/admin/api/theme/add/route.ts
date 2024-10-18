import prisma from "@/lib/db/prisma";

export async function POST(req: Request) {
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

    return Response.json(
      {
        themes: JSON.parse(JSON.stringify(themes)),
        newTheme: JSON.parse(JSON.stringify(newTheme)),
      },
      { status: 200 },
    );
  } catch (e) {
    console.log(e);
    return Response.json({ error: "Error" }, { status: 404 });
  }
}
