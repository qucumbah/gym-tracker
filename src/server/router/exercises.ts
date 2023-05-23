import { z } from "zod";
import { adminProcedure, publicProcedure, router } from "../utils/trpc";
import { prisma } from "@/server/utils/prisma";

export const exercisesRouter = router({
  list: publicProcedure.query(() => {
    return prisma.exercise.findMany();
  }),
  modify: adminProcedure
    .input(
      z.object({
        exerciseId: z.string(),
        name: z.string().optional(),
        description: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      return prisma.exercise.update({
        where: {
          id: input.exerciseId,
        },
        data: {
          name: input.name,
          description: input.description,
        },
      });
    }),
});
