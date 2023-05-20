"use client";

import React, { useMemo } from "react";
import { AxisOptions } from "react-charts";
import Chart from "./Chart";

type Datum = {
  x: Date;
  y: number;
};

export default function LineChart({
  label,
  data,
}: {
  label: string;
  data: Datum[];
}) {
  const primaryAxis = useMemo(
    (): AxisOptions<Datum> => ({
      getValue: (datum) => datum.x,
    }),
    []
  );

  const secondaryAxes = useMemo(
    (): AxisOptions<Datum>[] => [
      {
        getValue: (datum) => datum.y,
      },
    ],
    []
  );
  return (
    <>
      <Chart
        options={{
          data: [
            {
              label,
              data,
            },
          ],
          primaryAxis,
          secondaryAxes,
          tooltip: false,
        }}
      />
    </>
  );
}
