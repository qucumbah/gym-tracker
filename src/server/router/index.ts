import { router } from "../utils/trpc";
import { exercisesRouter } from "./exercises";
import { trainingSetsRouter } from "./trainingSets";
import { usersRouter } from "./users";
import { workoutsRouter } from "./workouts";

export const appRouter = router({
  workouts: workoutsRouter,
  trainingSets: trainingSetsRouter,
  exercises: exercisesRouter,
  users: usersRouter,
});

export type AppRouter = typeof appRouter;
