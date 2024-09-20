/*
  Warnings:

  - You are about to drop the column `preCount` on the `Section` table. All the data in the column will be lost.
  - You are about to drop the column `queueLeft` on the `Section` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Section" DROP COLUMN "preCount",
DROP COLUMN "queueLeft",
ALTER COLUMN "midtermExamDate" DROP NOT NULL,
ALTER COLUMN "finalExamDate" DROP NOT NULL;
