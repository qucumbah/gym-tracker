import React from "react";

export default function AnalysisResultPlaceholder({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid items-center justify-center m-8 border border-accent border-dashed">
      {children}
    </div>
  );
}
