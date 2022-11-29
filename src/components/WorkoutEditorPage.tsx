import { NextPage } from "next";
import { useRouter } from "next/router";
import NextError from "next/error";
import { trpc } from "@/utils/trpc";
import { Exercise, Workout } from "@prisma/client";
import React from "react";

const WorkoutEditorPage: NextPage = () => {
  const router = useRouter();

  const workoutId = router.query.workoutId;

  if (typeof workoutId !== "string") {
    return <NextError statusCode={404} />;
  }

  return (
    <WorkoutProvider workoutId={workoutId}>
      {(workout, exercises, dispatch) => (
        <WorkoutLayout>
          <WorkoutNameEditor
            name={workout.name}
            onChange={(newName) => dispatch(newName)}
          />
          {/* {workout.trainingSets.map((trainingSet) => (
            <WorkoutTrainingSetEditor
              key={trainingSet.id}
              trainingSet={trainingSet}
              onChange={}
              onDelete={}
            />
          ))} */}
          {/* <WorkoutTrainingSetCreator exercises={exercises} onCreate={} /> */}
        </WorkoutLayout>
      )}
    </WorkoutProvider>
  );
};

const WorkoutProvider: React.FC<{
  workoutId: string;
  children: (
    workout: Workout,
    exercises: Exercise[],
    dispatch: (newName: string) => void
  ) => React.ReactElement;
}> = ({ workoutId, children }) => {
  const { data: workout, isLoading: workoutLoading } =
    trpc.workouts.get.useQuery({
      workoutId,
    });

  const { data: exercises, isLoading: exercisesLoading } =
    trpc.exercises.list.useQuery();

  const ctx = trpc.useContext();

  const workoutModifyMutation = trpc.workouts.modify.useMutation({
    onMutate: async ({ workoutId, name }) => {
      await ctx.workouts.get.cancel();

      const prevWorkouts = ctx.workouts.get.getData({ workoutId });

      ctx.workouts.get.setData(
        (prev) => {
          if (!prev) {
            throw new Error();
          }

          return {
            ...prev,
            name,
          };
        },
        {
          workoutId,
        }
      );

      return { prevWorkouts };
    },
    onError: (_err, _newData, context) => {
      ctx.workouts.get.setData(context?.prevWorkouts, {
        workoutId: _newData.workoutId,
      });
    },
  });

  if (workoutLoading || exercisesLoading) {
    return <div className="">Loading...</div>;
  } else if (!workout || !exercises) {
    return <NextError statusCode={404} />;
  } else {
    return children(workout, exercises, (newName) =>
      workoutModifyMutation.mutate({ workoutId, name: newName })
    );
  }
};

const WorkoutLayout: React.FC<{ children: React.ReactElement }> = ({
  children,
}) => {
  return <div className="">{children}</div>;
};

const WorkoutNameEditor: React.FC<{
  name: string;
  onChange: (newName: string) => void;
}> = ({ name, onChange }) => {
  return (
    <div className="">
      <input
        type="text"
        onChange={(event) => onChange(event.currentTarget.value)}
        value={name}
      />
    </div>
  );
};

export default WorkoutEditorPage;
