"use server";

import { JWTPayload, jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import { User } from ".prisma/client";
import { Session } from "@/lib/db/item";

const secretKey = process.env.AUTH_SECRET;
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("4h")
    .sign(key);
}

export async function decrypt(input: string): Promise<JWTPayload> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}

export async function setCookie(user: User) {
  const expires = new Date(Date.now() + 60 * 60 * 4 * 1000); // 4h
  const session = await encrypt({ user, expires });

  const cookieStore = await cookies();
  cookieStore.set("adminSession", session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires,
    path: "/",
  });
}

export async function removeCookie() {
  const cookieStore = await cookies();
  cookieStore.delete("adminSession");
}

export async function getSession(): Promise<Session | null> {
  const cookieStore = await cookies();
  const encryptSession = cookieStore.get("adminSession")?.value;
  return encryptSession ? ((await decrypt(encryptSession)) as Session) : null;
}
