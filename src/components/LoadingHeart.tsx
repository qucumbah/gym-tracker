import Image from "next/image";

export default function LoadingHeart() {
  return (
    <div className="relative aspect-square w-36 animate-[heartbeat_1.2s_infinite] ease-heart">
      <Image src="/heart.svg" alt="" fill sizes="100vw" />
    </div>
  );
}
