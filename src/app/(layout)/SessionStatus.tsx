"use client";

import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import Image from "next/image";

export default function SessionStatus({
  session,
}: {
  session: Session | null;
}) {
  return (
    <div className="justify-self-end whitespace-nowrap">
      {session ? (
        <button
          className="flex gap-4 items-center"
          onClick={() =>
            signOut({
              callbackUrl: "/",
            })
          }
        >
          <div className="hidden lg:block">{session.user?.name}</div>
          <div className="relative aspect-square w-6">
            <Image src="/logout.svg" fill sizes="100vw" alt="" />
          </div>
        </button>
      ) : (
        <button className="flex gap-4 items-center" onClick={() => signIn()}>
          <div className="relative aspect-square w-6">
            <Image src="/login.svg" fill sizes="100vw" alt="" />
          </div>
          <div className="hidden lg:block">Sign in</div>
        </button>
      )}
    </div>
  );
}
