"use client";

import Button from "@/components/Button";
import { TrainingSet } from "@prisma/client";

export default function TrainingSetEditor({
  trainingSet,
  exerciseName,
  onChange,
  onDelete,
  disabled,
}: {
  trainingSet: TrainingSet;
  exerciseName: string;
  onChange: (newTrainingSet: TrainingSet) => void;
  onDelete: () => void;
  disabled: boolean;
}) {
  const parse = (value: string) => {
    if (value.length === 0) {
      return 0;
    }

    const parsedValue = parseInt(value, 10);
    const prevValue = trainingSet.load;

    if (isNaN(parsedValue) || parsedValue < 0) {
      return prevValue;
    }

    return parsedValue;
  };

  const updateLoad = (loadInput: string) => {
    onChange({
      ...trainingSet,
      load: parse(loadInput),
    });
  };

  const updateReps = (repsInput: string) => {
    onChange({
      ...trainingSet,
      reps: parse(repsInput),
    });
  };

  return (
    <div
      className={[
        "grid md:grid-cols-4 items-center gap-2 border border-blue-500 rounded-lg p-4",
        disabled ? "opacity-30" : "",
      ].join(" ")}
    >
      <div>Exercise: {exerciseName}</div>
      <div>
        <span>Load:</span>
        <input
          className="border-b border-accent ml-2 w-[3ch]"
          value={trainingSet.load}
          onChange={(event) => updateLoad(event.currentTarget.value)}
          disabled={disabled}
        />
      </div>
      <div>
        <span>Reps:</span>
        <input
          className="border-b border-accent ml-2 w-[3ch]"
          value={trainingSet.reps}
          onChange={(event) => updateReps(event.currentTarget.value)}
          disabled={disabled}
        />
      </div>
      <Button onClick={onDelete}>Delete</Button>
    </div>
  );
}
