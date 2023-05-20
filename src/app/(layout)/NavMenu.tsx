"use client";

import Link from "next/link";
import { Menu, Transition } from "@headlessui/react";
import Image from "next/image";
import React from "react";

export default function NavMenu() {
  // Readonly to allow using index as key
  const navLinks = [
    <Link className="py-4 px-6 block" href="/">
      Home
    </Link>,
    <Link className="py-4 px-6 block" href="/create-workout">
      New workout
    </Link>,
    <Link className="py-4 px-6 block" href="/previous-workouts">
      Previous workouts
    </Link>,
  ] as const;

  return (
    <nav className="">
      <Menu as="div" className="md:hidden">
        <Menu.Button className="relative aspect-square w-10">
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
          <Menu.Items className="absolute z-50 left-1/2 -translate-x-1/2 translate-y-2 shadow-[0px_5px_25px_0px_rgba(0,0,0,0.2)] text-2xl whitespace-nowrap bg-white rounded-md overflow-hidden flex flex-col">
            {navLinks.map((link, index) => (
              <Menu.Item as="li" key={index} className="list-none">
                {link}
              </Menu.Item>
            ))}
          </Menu.Items>
        </Transition>
      </Menu>
      <ul className="hidden md:flex justify-center gap-10">
        {navLinks.map((link, index) => (
          <li key={index}>{link}</li>
        ))}
      </ul>
    </nav>
  );
}
