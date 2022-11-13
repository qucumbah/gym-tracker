import Image from "next/image";
import React from "react";
import { useSession, signOut, signIn } from "next-auth/react";
import Link from "next/link";

const Layout: React.FC<{
  children: React.ReactNode;
  skipSessionCheck?: boolean;
}> = ({ children, skipSessionCheck }) => {
  const { data: session } = useSession({
    required: !(skipSessionCheck ?? false),
  });
  return (
    <div className="grid grid-rows-[auto_1fr] min-h-screen px-4 w-[clamp(20rem,80vw,80rem)] sm:w-3/4 mx-auto">
      <header className="grid grid-cols-[1fr_max-content_1fr] place-items-center justify-between h-24">
        <Link
          href="/"
          className="cursor-pointer flex gap-2 items-center py-4 justify-self-start"
        >
          <div className="inline-block invert aspect-square w-8">
            <Image src="/icon.svg" fill alt="logo" />
          </div>
          <span className="font-audiowide text-sm uppercase hidden lg:block">
            Workoutly
          </span>
        </Link>
        <nav className="">
          <ul className="flex justify-center gap-12">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/create-workout">New workout</Link>
            </li>
            <li>
              <Link href="/previous-workouts">Previous workouts</Link>
            </li>
          </ul>
        </nav>
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
              <div>
                Signed in as
                <br />
                {session.user?.name}
              </div>
              <div className="relative aspect-square w-6 invert">
                <Image src="/logout.svg" fill alt="" />
              </div>
            </button>
          ) : (
            <button
              className="flex gap-4 items-center"
              onClick={() => signIn()}
            >
              <div className="relative aspect-square w-6 invert">
                <Image src="/login.svg" fill alt="" />
              </div>
              <div>Sign in</div>
            </button>
          )}
        </div>
      </header>
      <div className="grid">{children}</div>
      <div className="fixed inset-0 -z-50 bg-slate-800" />
      <div className="fixed inset-0 -z-50 bg-[url(/noise.png)] opacity-10 filter grayscale-[0.6] brightness-50" />
    </div>
  );
};

export default Layout;
