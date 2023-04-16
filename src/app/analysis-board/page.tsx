import { useContext } from "react";
import { ExercisesContext } from "./ExercisesContext";
import ExercisePicker from "./ExercisePicker";

export default function AnalysisBoardPage() {
  const exercises = useContext(ExercisesContext);

  return (
    <div>
      <ExercisePicker exercises={[...exercises]} />
    </div>
  );
}
