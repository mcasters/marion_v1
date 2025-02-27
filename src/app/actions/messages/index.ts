"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { Message } from "@/lib/type";

export async function getMessages(): Promise<Message[]> {
  const res = await prisma.message.findMany({ include: { author: true } });
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
    const mess = await prisma.message.create({
      data: {
        date: new Date(),
        text,
        author: { connect: { email: userEmail } },
      },
    });

    revalidatePath(`/admin`);
    return { message: `Item ajouté`, isError: false };
  } catch (e) {
    return { message: `Erreur à l'enregistrement`, isError: true };
  }
}
