/*
  Warnings:

  - You are about to drop the column `type` on the `Course` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name,courseId,year,semester]` on the table `Section` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "SectionType" AS ENUM ('LECTURE', 'PRACTICE');

-- DropIndex
DROP INDEX "Section_name_courseId_key";

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "type";

-- AlterTable
ALTER TABLE "Section" ADD COLUMN     "type" "SectionType" NOT NULL DEFAULT 'LECTURE';

-- DropEnum
DROP TYPE "CourseType";

-- CreateIndex
CREATE UNIQUE INDEX "Section_name_courseId_year_semester_key" ON "Section"("name", "courseId", "year", "semester");
