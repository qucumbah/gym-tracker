import getServerSession from "@/utils/getServerSession";
import { notFound } from "next/navigation";
import Cms from "./Cms";
import { appRouter } from "@/server/router";

export const metadata = {
  title: "Content management",
};

export default async function CmsPage() {
  const session = await getServerSession();

  if (!session || !session.user.admin) {
    notFound();
  }

  const caller = appRouter.createCaller(session);

  const exercises = await caller.exercises.list();

  return <Cms exercises={exercises} />;
}
