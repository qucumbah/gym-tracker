import Image from "next/image";

export default function Loading() {
  return (
    <div className="grid place-items-center content-center justify-center">
      <span className="absolute -translate-y-2">Loading...</span>
      <div className="relative aspect-square w-36 animate-[heartbeat_1.2s_infinite] ease-heart">
        <Image src="/heart.svg" alt="" fill sizes="100vw" />
      </div>
    </div>
  );
}
