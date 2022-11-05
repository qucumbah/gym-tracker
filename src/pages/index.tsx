import { trpc } from "@/utils/trpc";

export default function Home() {
  const { data } = trpc.workouts.test.useQuery();
  return <div>{data}</div>;
}
