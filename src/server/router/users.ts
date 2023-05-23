import { adminProcedure, protectedProcedure, router } from "../utils/trpc";
import { prisma } from "@/server/utils/prisma";
import { z } from "zod";

export const usersRouter = router({
  self: protectedProcedure.query(async ({ ctx }) => {
    return prisma.user.findUnique({
      where: {
        id: ctx.user.id,
      },
    });
  }),
  changeAdminStatus: adminProcedure
    .input(
      z.object({
        userId: z.string(),
        status: z.boolean(),
      })
    )
    .mutation(async ({ input }) => {
      return prisma.user.update({
        where: {
          id: input.userId,
        },
        data: {
          admin: input.status,
        },
      });
    }),
});
