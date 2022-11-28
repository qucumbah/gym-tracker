import { trpc } from "@/utils/trpc";
import { Workout } from "@prisma/client";
import Head from "next/head";
import Router from "next/router";
import type { NextPage } from "next/types";
import Image from "next/image";
import Button from "@/components/common/Button";

const PreviousWorkouts: NextPage = () => {
  const { data: workouts } = trpc.workouts.list.useQuery();
  return (
    <>
      <Head>
        <title>Edit Workout</title>
      </Head>
      <main className="w-[clamp(15rem,50%,30rem)] mx-auto flex flex-col justify-center items-center gap-8">
        <h1 className="font-accent text-2xl uppercase">Edit Workout</h1>
        <ul className="w-full">
          {workouts?.map((workout: Workout) => {
            return (
              <li key={workout.id}>
                <Button
                  onClick={() => {
                    Router.push({
                      pathname: "/edit-workout",
                      query: {
                        workoutId: workout.id,
                      },
                    });
                  }}
                  className="w-full"
                >
                  <div className="flex gap-2 justify-center items-center">
                    {workout.name}
                    <div className="relative shrink-0 aspect-square w-4 invert">
                      <Image src="/edit.svg" fill alt="" />
                    </div>
                  </div>
                </Button>
              </li>
            );
          })}
        </ul>
        <Button
          primary
          className="w-full"
          onClick={() =>
            Router.push({
              pathname: "/create-workout",
            })
          }
        >
          Create new workout
        </Button>
      </main>
    </>
  );
};

export default PreviousWorkouts;
