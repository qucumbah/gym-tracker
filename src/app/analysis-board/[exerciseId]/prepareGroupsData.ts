import { Workout } from "@prisma/client";
import { TrainingSetGroup } from "./TrainingSetGroupsProvider";
import { Period, Measure, Grouping } from "./types";

export function prepareGroupsData({
  trainingSetGroups,
  period,
  measure,
  grouping,
}: {
  trainingSetGroups: TrainingSetGroup[];
  period: Period;
  measure: Measure;
  grouping: Grouping;
}) {
  const timeFilteredGroups = filterByPeriod(trainingSetGroups, period);

  timeFilteredGroups.sort(
    (a, b) => a.workout.time.getTime() - b.workout.time.getTime()
  );

  const measuredGroups = applyMeasure(timeFilteredGroups, measure);

  const result = applyGrouping(measuredGroups, grouping);

  return result;
}

function filterByPeriod(trainingSetGroups: TrainingSetGroup[], period: Period) {
  const periodLength = periodLengths[period];

  return trainingSetGroups.filter(
    (group) => group.workout.time.getTime() >= Date.now() - periodLength
  );
}

const dayLength = 24 * 60 * 60 * 1000;

const periodLengths: { [key in Period]: number } = {
  "All time": Infinity,
  "Last year": dayLength * 365,
  "Last 3 months": dayLength * 30 * 3,
  "Last month": dayLength * 30,
  "Last week": dayLength * 7,
};

type MeasuredGroup = {
  workout: Workout;
  measures: number[];
};

function applyMeasure(
  trainingSetGroups: TrainingSetGroup[],
  measure: Measure
): MeasuredGroup[] {
  return trainingSetGroups.map((group) => ({
    workout: group.workout,
    measures: group.trainingSets.map((trainingSet) => {
      if (measure === "Load") {
        return trainingSet.load;
      }

      if (measure === "Reps") {
        return trainingSet.reps;
      }

      return trainingSet.load * trainingSet.reps;
    }),
  }));
}

type GroupData = {
  workout: Workout;
  value: number;
};

function applyGrouping(
  groups: MeasuredGroup[],
  grouping: Grouping
): GroupData[] {
  return groups.map((group) => ({
    workout: group.workout,
    value:
      grouping === "Average"
        ? getAverage(group.measures)
        : Math.max(...group.measures),
  }));
}

function getAverage(values: number[]) {
  return values.reduce((sum, cur) => sum + cur) / values.length;
}
