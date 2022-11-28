import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/common/Button";

const StartPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Workoutly</title>
      </Head>
      <div className="grid grid-rows-[1fr_auto]">
        <div className="grid content-center gap-4">
          <header className="grid place-items-center">
            <h1 className="font-accent uppercase text-5xl">Workoutly</h1>
            <h2 className="uppercase text-lg">Gym Progress Tracker</h2>
          </header>
          <main className="grid">
            <div className="grid justify-center gap-4 grid-cols-[repeat(auto-fit,15rem)]">
              <Link href="/create-workout" className="relative w-full">
                <Button className="relative w-full" primary>
                  New workout
                </Button>
              </Link>
              <Link href="/previous-workouts" className="relative w-full">
                <Button className="relative w-full">Edit workouts</Button>
              </Link>
            </div>
          </main>
        </div>
        <footer className="p-3">
          <a
            href="https://github.com/qucumbah/gym-progress-tracker"
            target="_blank"
          >
            <div className="h-8 flex justify-center gap-2">
              <div className="relative w-8 h-full">
                <Image
                  src="/github_mark.png"
                  className="object-contain"
                  fill
                  alt=""
                />
              </div>
              <div className="relative w-16 h-full">
                <Image
                  src="/github_logo.png"
                  className="object-contain"
                  fill
                  alt=""
                />
              </div>
            </div>
          </a>
        </footer>
      </div>
    </>
  );
};

export default StartPage;
