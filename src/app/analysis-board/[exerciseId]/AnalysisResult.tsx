"use client";

import LineChart from "@/components/LineChart";
import { Exercise } from "@prisma/client";
import { useState } from "react";
import {
  Grouping,
  Measure,
  Period,
  groupings,
  measures,
  periods,
} from "./types";
import ParamSelector from "./ParamSelector";
import { TrainingSetGroup } from "./TrainingSetGroupsProvider";
import { prepareGroupsData } from "./prepareGroupsData";
import Link from "next/link";
import Button from "@/components/Button";
import Image from "next/image";

export default function AnalysisResult({
  trainingSetGroups,
  exercise,
}: {
  trainingSetGroups: TrainingSetGroup[];
  exercise: Exercise;
}) {
  const [period, setPeriod] = useState<Period>("All time");
  const [measure, setMeasure] = useState<Measure>("Load");
  const [grouping, setGrouping] = useState<Grouping>("Max");

  const data = prepareGroupsData({
    trainingSetGroups,
    period,
    measure,
    grouping,
  });

  return (
    <div className="flex flex-col gap-8">
      <div className="text-center font-accent uppercase">
        Analyzing exercise: {exercise.name}
      </div>
      <div className="relative h-[75vh]">
        <LineChart
          label={exercise.name}
          data={data.map((unit) => ({ x: unit.workout.time, y: unit.value }))}
        />
      </div>
      <div className="font-accent uppercase">Settings:</div>
      <div>
        <ParamSelector
          label="Period"
          options={[...periods]}
          selected={period}
          setSelected={setPeriod}
        />
        <ParamSelector
          label="Measure"
          options={[...measures]}
          selected={measure}
          setSelected={setMeasure}
        />
        <ParamSelector
          label="Grouping"
          options={[...groupings]}
          selected={grouping}
          setSelected={setGrouping}
        />
      </div>
      <div className="font-accent uppercase">Included workouts:</div>
      <ul className="w-full flex flex-col gap-2 pb-8">
        {data.map(({ workout }) => (
          <li key={workout.id}>
            <Link href={`/edit-workout/${workout.id}`} className="w-full">
              <Button className="w-full">
                <div className="flex gap-2 justify-center items-center">
                  {workout.name}
                  <div className="relative shrink-0 aspect-square w-4">
                    <Image src="/edit.svg" fill sizes="100vw" alt="" />
                  </div>
                </div>
              </Button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
