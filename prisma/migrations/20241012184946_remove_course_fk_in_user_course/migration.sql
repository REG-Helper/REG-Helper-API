/*
  Warnings:

  - Made the column `courseId` on table `UserCourses` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "UserCourses" ALTER COLUMN "courseId" SET NOT NULL;
