/*
  Warnings:

  - You are about to drop the column `course` on the `UserCourses` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserCourses" DROP CONSTRAINT "UserCourses_courseId_fkey";

-- AlterTable
ALTER TABLE "UserCourses" DROP COLUMN "course";
