import { nextAuthOptions } from "@/pages/api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth";

export default function getServerSession() {
  return unstable_getServerSession(nextAuthOptions);
}
