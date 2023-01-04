export default function FallbackButton({ className }: { className?: string }) {
  return (
    <div
      className={[
        "select-none px-16 py-4 border-2 border-blue-500 rounded-lg font-bold whitespace-nowrap text-transparent",
        className ?? "",
      ].join(" ")}
    >
      <div className="relative overflow-hidden h-4 rounded-md bg-slate-500/30">
        <div
          className={[
            "absolute inset-0 -translate-x-full",
            "animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent",
          ].join(" ")}
        />
      </div>
    </div>
  );
}
