import prisma from "@/lib/db/prisma";

export async function POST(req: Request) {
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
