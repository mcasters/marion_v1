import prisma from "@/lib/db/prisma";

export async function POST(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const id = parseInt(params.id);
    const activatedTheme = await prisma.theme.update({
      where: {
        id,
      },
      data: {
        isActive: true,
      },
    });
    await prisma.theme.updateMany({
      where: {
        isActive: true,
        id: { not: id },
      },
      data: {
        isActive: false,
      },
    });

    return Response.json(
      {
        activatedTheme: JSON.parse(JSON.stringify(activatedTheme)),
      },
      { status: 200 },
    );
  } catch (e) {
    console.log(e);
    return Response.json({ error: "Error" }, { status: 404 });
  }
}
