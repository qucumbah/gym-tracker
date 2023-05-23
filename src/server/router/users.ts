import { protectedProcedure, router } from "../utils/trpc";
import { prisma } from "@/server/utils/prisma";
import { z } from "zod";

export const usersRouter = router({
  get: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .query(async ({ input }) => {
      return prisma.user.findUnique({
        where: {
          id: input.userId,
        },
      });
    }),
  changeAdminStatus: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
        status: z.boolean(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      return prisma.user.update({
        where: {
          id: input.userId,
        },
        data: {
          admin: true,
        },
      });
    }),
});
