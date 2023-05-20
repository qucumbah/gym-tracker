import { appRouter } from "@/server/router";
import getServerSession from "@/utils/getServerSession";
import { Workout, TrainingSet, Exercise } from "@prisma/client";

export default async function TrainingSetGroupsProvider({
  exercise,
  render,
}: {
  exercise: Exercise;
  render: (groups: TrainingSetGroup[]) => React.ReactNode;
}) {
  const session = await getServerSession({ required: true });
  const caller = appRouter.createCaller(session);
  const [workouts, trainingSets] = await Promise.all([
    caller.workouts.list(),
    caller.trainingSets.list({}),
  ]);

  const filteredTrainingSets = trainingSets.filter(
    (trainingSet) => trainingSet.exerciseId === exercise.id
  );

  const groups = groupWorkoutsWithTrainingSets({
    workouts,
    trainingSets: filteredTrainingSets,
  });

  const filteredGroups = groups.filter(
    (group) => group.trainingSets.length !== 0
  );

  return render(filteredGroups);
}

export type TrainingSetGroup = {
  workout: Workout;
  trainingSets: TrainingSet[];
};

function groupWorkoutsWithTrainingSets({
  workouts,
  trainingSets,
}: {
  workouts: Workout[];
  trainingSets: TrainingSet[];
}) {
  const groups = new Map<string, TrainingSetGroup>();

  workouts.forEach((workout) => {
    groups.set(workout.id, {
      workout,
      trainingSets: [],
    });
  });

  trainingSets.forEach((trainingSet) => {
    groups.get(trainingSet.workoutId)!.trainingSets.push(trainingSet);
  });

  return [...groups.values()];
}
