import getServerSession from "@/utils/getServerSession";
import { notFound } from "next/navigation";
import Cms from "./Cms";
import { appRouter } from "@/server/router";

export const metadata = {
  title: "Content management",
};

export default async function CmsPage() {
  const session = await getServerSession();

  if (!session) {
    notFound();
  }

  const caller = appRouter.createCaller(session);

  const userInfo = await caller.users.get({ userId: session.user.id });

  if (!userInfo || !userInfo.admin) {
    notFound();
  }

  const exercises = await caller.exercises.list();

  return <Cms exercises={exercises} />;
}
