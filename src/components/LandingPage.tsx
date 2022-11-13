import Head from "next/head";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { NextPageWithCustomLayout } from "@/pages/_app";
import Layout from "./common/Layout";
import Button from "./common/Button";

const LandingPage: NextPageWithCustomLayout = () => {
  return (
    <>
      <Head>
        <title>Workoutly</title>
      </Head>
      <div className="grid grid-rows-[1fr_auto]">
        <main className="flex flex-col justify-center items-center">
          <h1 className="font-accent uppercase text-5xl">Workoutly</h1>
          <h2 className="uppercase text-xl">Gym Progress Tracker</h2>
          <Button primary onClick={() => signIn()} className="mt-12">
            Sign in / Sign up
          </Button>
        </main>
        <footer className="">
          <a
            href="https://github.com/qucumbah/gym-progress-tracker"
            target="_blank"
            rel="noreferrer"
            className="flex justify-center gap-2 h-16 p-4 cursor-pointer font-bold"
          >
            <div className="relative w-8">
              <Image
                src="/github_mark.png"
                className="object-contain"
                fill
                alt="GitHub icon"
              />
            </div>
            <div className="relative w-16">
              <Image
                src="/github_logo.png"
                className="object-contain"
                fill
                alt="GitHub logo"
              />
            </div>
          </a>
        </footer>
      </div>
    </>
  );
};

LandingPage.getLayout = (page) => <Layout skipSessionCheck>{page}</Layout>;

export default LandingPage;
