import { protectedProcedure, router } from "../utils/trpc";
import { prisma } from "@/server/utils/prisma";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const workoutsRouter = router({
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
      });
    }),
  create: protectedProcedure.mutation(async ({ ctx }) => {
    return prisma.workout.create({
      data: {
        name: "Workout",
        user: {
          connect: {
            id: ctx.user.id,
          },
        },
      },
    });
  }),
  modify: protectedProcedure
    .input(
      z.object({
        workoutId: z.string(),
        name: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      return prisma.workout.update({
        where: {
          id_userId: {
            id: input.workoutId,
            userId: ctx.user.id,
          },
        },
        data: {
          name: input.name,
        },
      });
    }),
});
