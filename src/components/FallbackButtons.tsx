import FallbackButton from "./FallbackButton";

export default function FallbackButtons({
  className,
  count,
}: {
  className?: string;
  count: number;
}) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <FallbackButton className={className} key={index} />
      ))}
    </>
  );
}
