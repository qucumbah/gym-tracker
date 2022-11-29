import { router } from "../utils/trpc";
import { exercisesRouter } from "./exercises";
import { trainingSetsRouter } from "./trainingSets";
import { workoutsRouter } from "./workouts";

export const appRouter = router({
  workouts: workoutsRouter,
  exercises: exercisesRouter,
  trainingSets: trainingSetsRouter,
});

export type AppRouter = typeof appRouter;
