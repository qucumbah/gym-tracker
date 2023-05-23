import NextAuth, { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/server/utils/prisma";
import { appRouter } from "@/server/router";

export const nextAuthOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async session({ session, token }) {
      const tempSession = {
        ...session,
        user: {
          ...session.user,
          id: token.userId,
        },
      };

      const caller = appRouter.createCaller(tempSession);

      const curUser = await caller.users.self();

      return {
        ...tempSession,
        user: {
          ...tempSession.user,
          admin: curUser?.admin,
        },
      };
    },
    async jwt({ user, token }) {
      if (user !== undefined) {
        token.userId = user.id;
      }

      return token;
    },
  },
};

export default NextAuth(nextAuthOptions);
