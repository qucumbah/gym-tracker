import getServerSession from "@/utils/getServerSession";
import Image from "next/image";
import Buttons from "./(page)/Buttons";

export const metadata = {
  title: "Workoutly - a gym progress tracker",
};

export default async function HomePage() {
  const session = await getServerSession();

  return (
    <>
      <div className="grid grid-rows-[1fr_1fr_auto] content-center">
        <header className="grid justify-items-center self-end">
          <h1 className="font-accent uppercase text-5xl">Workoutly</h1>
          <h2 className="uppercase text-lg">Gym Progress Tracker</h2>
        </header>
        <main className="grid pt-4 items-start">
          <div className="grid justify-center gap-4 grid-cols-[repeat(auto-fit,15rem)]">
            <Buttons isLoggedIn={!!session} />
          </div>
        </main>
        <footer className="p-4 grid place-items-center">
          <a
            href="https://github.com/qucumbah/gym-progress-tracker"
            target="_blank"
          >
            <div className="h-8 flex justify-center gap-2">
              <div className="relative w-8 h-full">
                <Image
                  sizes="100vw"
                  src="/github_mark.png"
                  className="object-contain filter invert"
                  fill
                  alt=""
                />
              </div>
              <div className="relative w-16 h-full">
                <Image
                  sizes="100vw"
                  src="/github_logo.png"
                  className="object-contain filter invert"
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
}
