"use client";

export default function WorkoutNameInput({
  workoutName,
  onChange,
  disabled,
}: {
  workoutName: string;
  onChange: (newName: string) => void;
  disabled: boolean;
}) {
  return (
    <div className="grid grid-cols-[auto_1fr] gap-2 place-items-center">
      <h2 className="uppercase">Workout name:</h2>
      <input
        type="text"
        className="w-full text-xl md:text-2xl border-b border-accent"
        value={workoutName}
        onChange={(event) => onChange(event.currentTarget.value)}
        disabled={disabled}
      />
    </div>
  );
}
