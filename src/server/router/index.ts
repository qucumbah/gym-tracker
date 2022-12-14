import { router } from "../utils/trpc";
import { exercisesRouter } from "./exercises";
import { trainingSetsRouter } from "./trainingSets";
import { workoutsRouter } from "./workouts";

export const appRouter = router({
  workouts: workoutsRouter,
  trainingSets: trainingSetsRouter,
  exercises: exercisesRouter,
});

export type AppRouter = typeof appRouter;
