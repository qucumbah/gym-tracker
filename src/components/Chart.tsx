import dynamic from "next/dynamic";
import type { Chart as ChartType } from "react-charts";

// Hack to avoid ESM import issue due to react-charts dependencies not shipping CJS
// https://github.com/TanStack/react-charts/issues/324
export default dynamic(() => import("react-charts").then((mod) => mod.Chart), {
  ssr: false,
}) as typeof ChartType;
