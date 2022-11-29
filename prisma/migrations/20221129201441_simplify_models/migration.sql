/*
  Warnings:

  - You are about to drop the column `exerciseKindId` on the `Exercise` table. All the data in the column will be lost.
  - You are about to drop the column `workoutId` on the `Exercise` table. All the data in the column will be lost.
  - You are about to drop the column `rpe` on the `TrainingSet` table. All the data in the column will be lost.
  - You are about to drop the `ExerciseKind` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[id,userId]` on the table `TrainingSet` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Exercise` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `TrainingSet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `workoutId` to the `TrainingSet` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Exercise_id_workoutId_key";

-- DropIndex
DROP INDEX "TrainingSet_id_exerciseId_key";

-- AlterTable
ALTER TABLE "Exercise" DROP COLUMN "exerciseKindId";
ALTER TABLE "Exercise" DROP COLUMN "workoutId";
ALTER TABLE "Exercise" ADD COLUMN     "name" STRING NOT NULL;

-- AlterTable
ALTER TABLE "TrainingSet" DROP COLUMN "rpe";
ALTER TABLE "TrainingSet" ADD COLUMN     "userId" STRING NOT NULL;
ALTER TABLE "TrainingSet" ADD COLUMN     "workoutId" STRING NOT NULL;

-- DropTable
DROP TABLE "ExerciseKind";

-- CreateIndex
CREATE UNIQUE INDEX "TrainingSet_id_userId_key" ON "TrainingSet"("id", "userId");
