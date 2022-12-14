import { protectedProcedure, router } from "../utils/trpc";
import { prisma } from "@/server/utils/prisma";

export const exercisesRouter = router({
  list: protectedProcedure.query(({ ctx }) => {
    return prisma.exercise.findMany();
  }),
});
