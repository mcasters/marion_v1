"use server";

import { removeCookie, setCookie } from "@/app/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function loginAction(
  prevState: { message: string },
  formData: FormData,
) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const user = await prisma.user.findUnique({
    where: { email },
    omit: { password: false },
  });
  if (!user) return { message: "Erreur d'authentification" };
  const res = await bcrypt.compare(password, user.password);
  if (!res) return { message: "Erreur d'authentification" };

  await setCookie(user);
  redirect("/admin");
  return { message: "Authentifié" };
}

export async function logoutAction() {
  await removeCookie();
  redirect("/");
}
