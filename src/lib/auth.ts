import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/db/prisma";
import bcrypt from "bcryptjs";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "coucou@ouhou.fr",
        },
        password: { label: "Mot de passe", type: "password" },
      },
      authorize: async (credentials, req) => {
        // @ts-ignore
        const { email, password } = credentials;
        const user = await prisma.user.findUnique({
          where: {
            email,
          },
        });
        if (!user) return null;
        bcrypt.compare(password, user.password, (err, res) => {
          if (err || !res) return null;
        });
        return {
          id: user.id.toString(),
          email: user.email,
          password: user.password,
          isAdmin: user.isAdmin,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 3 * 60 * 60,
  },
} satisfies NextAuthOptions;

// Use it in server contexts
export function auth(...args: [NextApiRequest, NextApiResponse] | []) {
  return getServerSession(...args, authOptions);
}
