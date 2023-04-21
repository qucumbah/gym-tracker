import { CreateNextContextOptions } from "@trpc/server/adapters/next";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/pages/api/auth/[...nextauth]";
import { inferAsyncReturnType } from "@trpc/server";

export const createContext = async ({ req, res }: CreateNextContextOptions) => {
  const session = await getServerSession(req, res, nextAuthOptions);
  return {
    user: session?.user,
  };
};

export type Context = inferAsyncReturnType<typeof createContext>;
