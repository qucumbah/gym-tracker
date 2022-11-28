import Modal from "@/components/common/Modal";
import { trpc } from "@/utils/trpc";
import { Workout } from "@prisma/client";
import Router from "next/router";
import Head from "next/head";
import type { NextPage } from "next/types";
import React, { useState } from "react";
import Image from "next/image";
import Button from "@/components/common/Button";

const CreateWorkoutPage: NextPage = () => {
  const { data: workouts } = trpc.workouts.list.useQuery();
  const workoutCreateMutation = trpc.workouts.create.useMutation();
  const workoutCopyMutation = trpc.workouts.copy.useMutation();

  const newWorkoutElement: JSX.Element = (
    <Button
      primary
      className="w-full"
      onClick={async () => {
        setIsCreatingWorkout(true);
        const creationResult: Workout =
          await workoutCreateMutation.mutateAsync();

        Router.push({
          pathname: "/workout",
          query: {
            workoutId: creationResult.id,
          },
        });
      }}
    >
      <div className="flex gap-2 justify-center items-center">
        New workout
        <div className="relative shrink-0 aspect-square w-4 invert">
          <Image src="/double_arrow.svg" fill sizes="100vw" alt="" />
        </div>
      </div>
    </Button>
  );

  const [isCreatingWorkout, setIsCreatingWorkout] = useState(false);

  const existingWorkoutElements: JSX.Element[] =
    workouts?.map((workout: Workout) => (
      <li key={workout.id}>
        <Button
          onClick={async () => {
            setIsCreatingWorkout(true);
            const creationResult: Workout =
              await workoutCopyMutation.mutateAsync({
                copyTargetId: workout.id,
              });

            Router.push({
              pathname: "/workout",
              query: {
                workoutId: creationResult.id,
              },
            });
          }}
          className="w-full"
        >
          <div className="flex gap-2 justify-center items-center">
            {workout.name}
            <div className="relative shrink-0 aspect-square w-4 invert">
              <Image src="/copy.svg" fill sizes="100vw" alt="" />
            </div>
          </div>
        </Button>
      </li>
    )) ?? [];

  return (
    <>
      <Head>
        <title>Workout Creation</title>
      </Head>
      <main className="w-[clamp(15rem,50%,30rem)] mx-auto flex flex-col justify-center items-center gap-8">
        <h1 className="font-accent text-2xl uppercase">Create workout</h1>
        {newWorkoutElement}
        <div className="">Or copy existing workout:</div>
        <ul className="w-full">{existingWorkoutElements}</ul>
      </main>
      <Modal isOpen={isCreatingWorkout} onClose={() => {}} title="Loading...">
        <div className="">Creating a new workout...</div>
      </Modal>
    </>
  );
};

export default CreateWorkoutPage;
