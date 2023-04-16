import { appRouter } from "@/server/router";
import getServerSession from "@/utils/getServerSession";
import { ExercisesContext } from "./ExercisesContext";

export const metadata = {
  title: "Analysis Board",
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession({ required: true });

  const caller = appRouter.createCaller(session);

  const exercises = await caller.exercises.list();

  return (
    <ExercisesContext.Provider value={exercises}>
      <main className="flex flex-col gap-8 pb-8">{children}</main>
    </ExercisesContext.Provider>
  );
}
