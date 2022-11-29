import { protectedProcedure, router } from "../utils/trpc";
import { prisma } from "@/server/utils/prisma";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const trainingSetsRouter = router({
  get: protectedProcedure
    .input(
      z.object({
        trainingSetId: z.string(),
      })
    )
    .query(({ input, ctx }) => {
      return prisma.trainingSet.findUnique({
        where: {
          id_userId: {
            id: input.trainingSetId,
            userId: ctx.user.id,
          },
        },
        include: {
          exercise: true,
        },
      });
    }),
  create: protectedProcedure
    .input(
      z.object({
        trainingSetId: z.string().optional(),
        load: z.number(),
        reps: z.number(),
        workoutId: z.string(),
        exerciseId: z.string(),
      })
    )
    .mutation(({ input, ctx }) => {
      return prisma.trainingSet.create({
        data: {
          load: input.load,
          reps: input.reps,
          user: {
            connect: {
              id: ctx.user.id,
            },
          },
          workout: {
            connect: {
              id_userId: {
                id: input.workoutId,
                userId: ctx.user.id,
              },
            },
          },
          exercise: {
            connect: {
              id: input.exerciseId,
            },
          },
        },
      });
    }),
  modify: protectedProcedure
    .input(
      z.object({
        trainingSetId: z.string(),
        load: z.number(),
        reps: z.number(),
      })
    )
    .mutation(({ input, ctx }) => {
      return prisma.trainingSet.update({
        where: {
          id_userId: {
            id: input.trainingSetId,
            userId: ctx.user.id,
          },
        },
        data: {
          load: input.load,
          reps: input.reps,
          user: {
            connect: {
              id: ctx.user.id,
            },
          },
        },
      });
    }),
  delete: protectedProcedure
    .input(
      z.object({
        trainingSetId: z.string(),
      })
    )
    .mutation(({ input, ctx }) => {
      return prisma.trainingSet.delete({
        where: {
          id_userId: {
            id: input.trainingSetId,
            userId: ctx.user.id,
          },
        },
      });
    }),
});
