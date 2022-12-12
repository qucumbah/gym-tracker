"use client";

import Button from "@/components/Button";
import { Workout } from "@prisma/client";

export default function WorkoutsList({
  workouts,
  onSelect,
  additionalContent,
}: {
  workouts: Workout[];
  onSelect: (workout: Workout) => void;
  additionalContent?: React.ReactNode;
}) {
  return (
    <ul className="w-full">
      {workouts.map((workout: Workout) => (
        <li key={workout.id}>
          <Button onClick={() => onSelect(workout)} className="w-full">
            <div className="flex gap-2 justify-center items-center">
              {workout.name}
              {additionalContent}
            </div>
          </Button>
        </li>
      ))}
    </ul>
  );
}
