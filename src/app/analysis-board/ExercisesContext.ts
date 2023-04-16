import { Exercise } from "@prisma/client";
import React from "react";

export const ExercisesContext = React.createServerContext<
  ReadonlyArray<Exercise>
>("ExercisesContext", [] as const);
