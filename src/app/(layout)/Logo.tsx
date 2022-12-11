import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
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
  );
}
