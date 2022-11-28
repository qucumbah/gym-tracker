import Image from "next/image";
import React from "react";
import { useSession, signOut, signIn } from "next-auth/react";
import Link from "next/link";
import { Menu, Transition } from "@headlessui/react";

const Layout: React.FC<{
  children: React.ReactNode;
  skipSessionCheck?: boolean;
}> = ({ children, skipSessionCheck }) => {
  const { data: session } = useSession({
    required: !(skipSessionCheck ?? false),
  });

  // Readonly to allow using index as key
  const navLinks = [
    <Link href="/">Home</Link>,
    <Link href="/create-workout">New workout</Link>,
    <Link href="/previous-workouts">Previous workouts</Link>,
  ] as const;

  return (
    <div className="grid grid-rows-[auto_1fr] min-h-screen px-4 w-[clamp(20rem,80vw,80rem)] sm:w-3/4 mx-auto">
      <header className="grid grid-cols-[1fr_max-content_1fr] place-items-center justify-between h-24">
        <Link
          href="/"
          className="cursor-pointer flex gap-2 items-center py-4 justify-self-start"
        >
          <div className="inline-block relative aspect-square w-8">
            <Image src="/icon.svg" fill sizes="100vw" alt="logo" />
          </div>
          <span className="font-audiowide text-sm uppercase hidden lg:block">
            Workoutly
          </span>
        </Link>
        <nav className="">
          <Menu as="div" className="md:hidden">
            <Menu.Button className="relative aspect-square w-10 invert">
              <Image src="/bars.svg" alt="" fill sizes="100vw" />
            </Menu.Button>
            <Transition
              as={React.Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute left-1/2 -translate-x-1/2 translate-y-2 text-black text-2xl whitespace-nowrap bg-white rounded-md overflow-hidden flex flex-col">
                {navLinks.map((link, index) => (
                  <Menu.Item
                    as="li"
                    key={index}
                    className="list-none py-4 px-6"
                  >
                    {link}
                  </Menu.Item>
                ))}
              </Menu.Items>
            </Transition>
          </Menu>
          <ul className="hidden md:flex justify-center gap-12">
            {navLinks.map((link, index) => (
              <li key={index}>{link}</li>
            ))}
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
              <div className="hidden lg:block">{session.user?.name}</div>
              <div className="relative aspect-square w-6">
                <Image src="/logout.svg" fill sizes="100vw" alt="" />
              </div>
            </button>
          ) : (
            <button
              className="flex gap-4 items-center"
              onClick={() => signIn()}
            >
              <div className="relative aspect-square w-6">
                <Image src="/login.svg" fill sizes="100vw" alt="" />
              </div>
              <div className="hidden lg:block">Sign in</div>
            </button>
          )}
        </div>
      </header>
      <div className="grid">{children}</div>
    </div>
  );
};

export default Layout;
