import Button from "@/components/Button";
import Image from "next/image";

export default function CreateButton({ onCreate }: { onCreate: () => void }) {
  return (
    <Button primary className="w-full" onClick={onCreate}>
      <div className="flex gap-2 justify-center items-center">
        New workout
        <div className="relative shrink-0 aspect-square w-4 invert">
          <Image src="/double_arrow.svg" fill sizes="100vw" alt="" />
        </div>
      </div>
    </Button>
  );
}
