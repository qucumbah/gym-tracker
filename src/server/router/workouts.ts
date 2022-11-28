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
  copy: protectedProcedure
    .input(
      z.object({
        copyTargetId: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const existingWorkout = await prisma.workout.findUnique({
        where: {
          id_userId: {
            id: input.copyTargetId,
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

      if (existingWorkout === null) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Invalid copy target ID",
        });
      }

      // TODO: this is broken
      return prisma.workout.create({
        data: {
          name: existingWorkout.name,
          userId: existingWorkout.userId,
          exercises: {
            createMany: {
              data: existingWorkout.exercises.map((existingExercise) => ({
                exerciseKindId: existingExercise.exerciseKindId,
                userId: existingWorkout.userId,
                sets: {
                  createMany: {
                    data: existingExercise.trainingSets.map((existingSet) => ({
                      userId: existingWorkout.userId,
                      load: existingSet.load,
                      reps: existingSet.reps,
                      rpe: existingSet.rpe,
                    })),
                  },
                },
              })),
            },
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
        name: z.string().optional(),
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
