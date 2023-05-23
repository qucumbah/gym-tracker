import Button from "@/components/Button";
import { Exercise } from "@prisma/client";

export default function ExercisesList({
  exercises,
  onSelect,
  showDescriptions = false,
}: {
  exercises: Exercise[];
  onSelect: (workout: Exercise) => void;
  showDescriptions?: boolean;
}) {
  return (
    <ul className="w-full flex flex-col gap-2">
      {exercises.map((exercise: Exercise) => (
        <li key={exercise.id}>
          <Button primary onClick={() => onSelect(exercise)} className="w-full">
            <div className="flex gap-2 justify-center items-center">
              {exercise.name}
            </div>
            {showDescriptions && (
              <div className="flex pt-4 gap-2 justify-center items-center text-xs">
                {exercise.description}
              </div>
            )}
          </Button>
        </li>
      ))}
    </ul>
  );
}
