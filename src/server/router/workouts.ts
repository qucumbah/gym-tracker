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
  copy: protectedProcedure
    .input(
      z.object({
        workoutId: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const [existingWorkout, existingTrainingSets] = await prisma.$transaction(
        [
          prisma.workout.findUnique({
            where: {
              id_userId: {
                id: input.workoutId,
                userId: ctx.user.id,
              },
            },
          }),
          prisma.trainingSet.findMany({
            where: {
              userId: ctx.user.id,
              workoutId: input.workoutId,
            },
          }),
        ]
      );

      if (existingWorkout === null) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `Workout with ID ${input.workoutId} not found`,
        });
      }

      const newWorkout = await prisma.workout.create({
        data: {
          ...existingWorkout,
          id: undefined,
          name: `${existingWorkout.name} - copy`,
        },
      });

      await prisma.trainingSet.createMany({
        data: existingTrainingSets.map((existingTrainingSet) => ({
          ...existingTrainingSet,
          id: undefined,
          workoutId: newWorkout.id,
        })),
      });

      return newWorkout;
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
