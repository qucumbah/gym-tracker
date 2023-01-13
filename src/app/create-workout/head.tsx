import DefaultHead from "@/components/DefaultHead";
import getServerSession from "@/utils/getServerSession";

export default async function Head() {
  await getServerSession({ required: true });

  return (
    <>
      <DefaultHead />
      <title>Create Workout</title>
    </>
  );
}
