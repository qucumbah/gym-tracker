import Button from "@/components/Button";
import Image from "next/image";
import Link from "next/link";

export default function WorkoutToEditMenu({
  workoutPickMenu,
}: {
  workoutPickMenu: React.ReactNode;
}) {
  return (
    <>
      {workoutPickMenu}
      <div>Or create a new workout:</div>
      <Link href={"/create-workout"} className="w-full">
        <Button primary className="w-full">
          <div className="flex gap-2 justify-center items-center">
            New workout
            <div className="relative shrink-0 aspect-square w-4 invert">
              <Image src="/double_arrow.svg" fill sizes="100vw" alt="" />
            </div>
          </div>
        </Button>
      </Link>
    </>
  );
}
