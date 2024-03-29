import { nextAuthOptions } from "@/pages/api/auth/[...nextauth]";
import { Session } from "next-auth";
import { getServerSession as getNextAuthServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function getServerSession<R extends boolean>({
  required,
}: {
  required?: R;
} = {}): Promise<R extends true ? Session : Session | null> {
  const session = await getNextAuthServerSession(nextAuthOptions);

  if (required && session === null) {
    return redirect("/");
  }

  return session as Session;
}
