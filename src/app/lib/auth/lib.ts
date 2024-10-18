"use server";

import { jwtVerify, SignJWT } from "jose";
import prisma from "@/lib/db/prisma";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const secretKey = process.env.AUTH_SECRET;
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("4h")
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}

export async function login(dataNature: string, formData: FormData) {
  if (dataNature === "credentials") {
    const email = formData.get("email");
    const password = formData.get("password");
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) throw new Error("Erreur d'authentification");
    bcrypt.compare(password, user.password, (err, res) => {
      if (err || !res) throw new Error("Erreur d'authentification");
    });

    // user
    // {
    //   id: user.id.toString(),
    //   email: user.email,
    //   password: user.password,
    //   isAdmin: user.isAdmin,
    // };

    const expires = new Date(Date.now() + 60 * 60 * 4 * 1000); // 4h
    const session = await encrypt({ user, expires });

    cookies().set("adminSession", session, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      expires,
      path: "/",
    });
  }
}

export async function logout() {
  cookies().set("adminSession", "", { expires: new Date(0) });
}

// export async function handleLogin(sessionData) {
//   const encryptedSessionData = encrypt(sessionData); // Encrypt your session data
//   cookies().set("session", encryptedSessionData, {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production",
//     maxAge: 60 * 60 * 24 * 7, // One week
//     path: "/",
//   });
//
//   redirect("/admin");
//   // Redirect or handle the response after setting the cookie
// }

export async function getSession() {
  const session = cookies().get("adminSession")?.value;
  return session ? await decrypt(session) : null;
}

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get("adminSession")?.value;
  if (!session) return;

  const parsed = await decrypt(session);
  parsed.expires = new Date(Date.now() + 60 * 60 * 4 * 1000); // 4h
  const res = NextResponse.next();
  res.cookies.set({
    name: "adminSession",
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires,
  });
  return res;
}
