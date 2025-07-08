"use server";
import prisma from "@/lib/script.ts";
import { revalidatePath } from "next/cache";
import { Message } from "@/lib/type";

export async function getMessages(): Promise<Message[]> {
  const res = await prisma.message.findMany({
    include: { author: true },
    orderBy: { date: "desc" },
  });
  return JSON.parse(JSON.stringify(res));
}

export async function addMessage(
  prevState: { message: string; isError: boolean } | null,
  formData: FormData,
) {
  const rawFormData = Object.fromEntries(formData);
  const text = rawFormData.text as string;
  const userEmail = rawFormData.userEmail as string;

  try {
    await prisma.message.create({
      data: {
        date: new Date(),
        text,
        author: { connect: { email: userEmail } },
      },
    });
    revalidatePath(`/admin`);
    return { message: "Message ajouté", isError: false };
  } catch (e) {
    return { message: `Erreur à l'enregistrement`, isError: true };
  }
}

export async function updateMessage(
  prevState: { message: string; isError: boolean } | null,
  formData: FormData,
) {
  const rawFormData = Object.fromEntries(formData);
  const id = Number(rawFormData.id);
  const text = rawFormData.text as string;
  const userEmail = rawFormData.userEmail as string;

  try {
    await prisma.message.update({
      where: { id },
      data: {
        date: new Date(),
        text,
        author: { connect: { email: userEmail } },
      },
    });
    revalidatePath(`/admin`);
    return { message: "Message modifié", isError: false };
  } catch (e) {
    return { message: `Erreur à l'enregistrement`, isError: true };
  }
}

export async function deleteMessage(id: number) {
  try {
    await prisma.message.delete({
      where: { id },
    });
    revalidatePath(`/admin`);
  } catch (e) {}
}
