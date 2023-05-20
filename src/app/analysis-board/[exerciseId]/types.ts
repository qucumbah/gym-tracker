export const periods = [
  "Last week",
  "Last month",
  "Last 3 months",
  "Last year",
  "All time",
] as const;
export const measures = ["Load", "Reps", "Load * Reps"] as const;
export const groupings = ["Max", "Average"] as const;

export type Period = (typeof periods)[number];
export type Measure = (typeof measures)[number];
export type Grouping = (typeof groupings)[number];
