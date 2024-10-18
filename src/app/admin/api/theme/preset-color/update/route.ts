import prisma from "@/lib/db/prisma";

export async function POST(req: Request) {
  try {
    const presetColor = await req.json();
    await prisma.presetColor.update({
      where: {
        id: presetColor.id,
      },
      data: {
        color: presetColor.color,
      },
    });
    const updatedPresetColors = await prisma.presetColor.findMany();

    return Response.json(
      {
        updatedPresetColors: JSON.parse(JSON.stringify(updatedPresetColors)),
      },
      { status: 200 },
    );
  } catch (e) {
    console.log(e);
    return Response.json({ error: "Error" }, { status: 404 });
  }
}
