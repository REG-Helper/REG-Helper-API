/*
  Warnings:

  - You are about to drop the `SectionTime` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `endAt` to the `Section` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startAt` to the `Section` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "SectionTime" DROP CONSTRAINT "SectionTime_sectionId_fkey";

-- AlterTable
ALTER TABLE "Section" ADD COLUMN     "endAt" TIME NOT NULL,
ADD COLUMN     "startAt" TIME NOT NULL;

-- DropTable
DROP TABLE "SectionTime";
