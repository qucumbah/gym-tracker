import { protectedProcedure, publicProcedure, router } from "../utils/trpc";
import { prisma } from "@/server/utils/prisma";
import { z } from "zod";

export const workoutsRouter = router({
  test: publicProcedure.query(() => "result!"),
  list: protectedProcedure.query(({ ctx }) => {
    return prisma.workout.findMany({
      where: {
        userId: ctx.user.id,
      },
    });
  }),
  get: protectedProcedure
    .input(
      z.object({
        workoutId: z.string(),
      })
    )
    .query(({ input, ctx }) => {
      return prisma.workout.findUnique({
        where: {
          id_userId: {
            id: input.workoutId,
            userId: ctx.user.id,
          },
        },
        include: {
          exercises: {
            include: {
              trainingSets: true,
              exerciseKind: true,
            },
          },
        },
      });
    }),
});
