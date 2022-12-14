import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.exercise.createMany({
    data: [
      {
        name: "Squat",
      },
      {
        name: "Bench press",
      },
      {
        name: "Deadlift",
      },
    ],
  });
}

main();
