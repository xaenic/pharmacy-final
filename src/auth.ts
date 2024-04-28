"use server";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { authConfig } from "./auth.config";
import { getUser } from "./lib/db/db";
import { IUser } from "./lib/models/userModel";
import bcrypt from "bcrypt";
import { z } from "zod";
export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      name: "AdminLogin",
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        console.log("una ko");
        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user: IUser | null = await getUser(email as string);
          if (user) {
            const passwordsMatch = await bcrypt.compare(
              password,
              user.password
            );
            if (passwordsMatch)
              return {
                name: user.firstname,
                email: user.email,
                role: user.role,
                user,
              };
          }
        }
        console.log("invalid credentials");
        return null;
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.user = user;
      return token;
    },
    async session({ session, token, user }) {
      session = token.user as any;
      console.log(session);
      return session;
    },
  },
});
