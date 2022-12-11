"use client";

import Button from "@/components/Button";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function Buttons({ isLoggedIn }: { isLoggedIn: boolean }) {
  return isLoggedIn ? (
    <>
      <Link href="/create-workout" className="relative w-full">
        <Button className="relative w-full" primary>
          New workout
        </Button>
      </Link>
      <Link href="/previous-workouts" className="relative w-full">
        <Button className="relative w-full">Edit workouts</Button>
      </Link>
    </>
  ) : (
    <Button primary onClick={() => signIn()} className="relative w-full">
      Sign in / Sign up
    </Button>
  );
}
