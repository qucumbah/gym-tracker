import React from "react";
import { appRouter } from "@/server/router";
import getServerSession from "@/utils/getServerSession";
import { ExercisesContext } from "./ExercisesContext";
import ExercisePicker from "./ExercisePicker";

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
      <main className="grid gap-8 py-4 md:grid-cols-[auto_1fr]">
        <div className="w-[clamp(15rem,50%,30rem)] justify-self-center">
          <ExercisePicker exercises={[...exercises]} />
        </div>
        <div className="grid">{children}</div>
      </main>
    </ExercisesContext.Provider>
  );
}
