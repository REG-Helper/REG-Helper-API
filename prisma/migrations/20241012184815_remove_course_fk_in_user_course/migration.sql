/*
  Warnings:

  - Added the required column `course` to the `UserCourses` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UserCourses" DROP CONSTRAINT "UserCourses_courseId_fkey";

-- AlterTable
ALTER TABLE "UserCourses" ADD COLUMN     "course" TEXT NOT NULL,
ALTER COLUMN "courseId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "UserCourses" ADD CONSTRAINT "UserCourses_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE SET NULL ON UPDATE CASCADE;
