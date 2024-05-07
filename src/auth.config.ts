import type { NextAuthConfig } from "next-auth";
import { IUser } from "./lib/models/userModel";

/**
 * The shape of the returned object in the OAuth providers' `profile` callback,
 * available in the `jwt` and `session` callbacks,
 * or the second parameter of the `session` callback, when using a database.
 */

export const authConfig = {
  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login",
  },
  providers: [],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const me: IUser = auth as any;
      const isOnDashboard = nextUrl.pathname.startsWith("/admin");
      const isOnLandingPage = nextUrl.pathname === "/";
      const isOnAuth =
        nextUrl.pathname.startsWith("/login") ||
        nextUrl.pathname.startsWith("/register");
      if (isLoggedIn) {
        const isAdmin = me?.role == "admin";
        if (isAdmin && !isOnDashboard)
          return Response.redirect(new URL("/admin", nextUrl));
        if (!isAdmin && isOnDashboard)
          return Response.redirect(new URL("/", nextUrl));
        if (isOnAuth) return Response.redirect(new URL("/", nextUrl));
      } else if (!isOnLandingPage && !isOnAuth) {
        return false;
      }

      return true;

      // if (isOnDashboard) {
      //   if (isLoggedIn) {
      //     if (!isAdmin) return Response.redirect(new URL("/", nextUrl));
      //     return true;
      //   }
      //   return false;
      // }

      // if (isOnDashboard) {
      //   if (isLoggedIn) {
      //     if (me.role == "customer") {
      //       console.log(me.user.role);
      //       return Response.redirect(new URL("/", nextUrl));
      //     }
      //     return true;
      //   }
      //   return false; // Redirect unauthenticated users to login page
      // } else if (isOnAuth && isLoggedIn) {
      //   return Response.redirect(new URL("/", nextUrl));
      // }
      // return true;
    },
    // diri nalang ibutang instead sa auth.ts kay ambot wala sad ko kabalo pero ni gana man ana nalang reference ibutang nako aron diko malimot
    // https://github.com/nextauthjs/next-auth/issues/9836
    async session({ token, session }) {
      session = token.user as any;
      return session;
    },
    async jwt({ token, user }) {
      if (user) token.user = user;
      return token;
    },
  },
} satisfies NextAuthConfig;
