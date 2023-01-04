import FallbackButton from "./FallbackButton";

export default function FallbackButtons({
  className,
  count,
}: {
  className?: string;
  count: number;
}) {
  return (
    <div className="w-full flex flex-col gap-2">
      {Array.from({ length: count }).map((_, index) => (
        <FallbackButton className={className} key={index} />
      ))}
    </div>
  );
}
