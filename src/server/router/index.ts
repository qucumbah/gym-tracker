import { router } from "../utils/trpc";
import { workoutsRouter } from "./workouts";

export const appRouter = router({
  workouts: workoutsRouter,
});

export type AppRouter = typeof appRouter;
