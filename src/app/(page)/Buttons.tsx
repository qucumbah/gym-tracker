"use client";

import Button from "@/components/Button";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function Buttons({ isLoggedIn }: { isLoggedIn: boolean }) {
  return (
    <div className="grid justify-center gap-4 grid-cols-[15rem] md:grid-cols-[15rem_15rem]">
      {isLoggedIn ? <ControlButtons /> : <LogInButton />}
    </div>
  );
}

function ControlButtons() {
  return (
    <>
      <Link href="/create-workout" className="relative w-full md:col-span-2">
        <Button className="relative w-full px-[unset]" primary>
          New workout
        </Button>
      </Link>
      <Link href="/previous-workouts" className="relative w-full">
        <Button className="relative w-full px-[unset]">Previous workouts</Button>
      </Link>
      <Link href="/analysis-board" className="relative w-full">
        <Button className="relative w-full px-[unset]">Analysis board</Button>
      </Link>
    </>
  );
}

function LogInButton() {
  return (
    <Button primary onClick={() => signIn()} className="relative w-full">
      Sign in / Sign up
    </Button>
  );
}
