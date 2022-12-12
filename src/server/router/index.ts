import { router } from "../utils/trpc";
import { trainingSetsRouter } from "./trainingSets";
import { workoutsRouter } from "./workouts";

export const appRouter = router({
  workouts: workoutsRouter,
  trainingSets: trainingSetsRouter,
});

export type AppRouter = typeof appRouter;
