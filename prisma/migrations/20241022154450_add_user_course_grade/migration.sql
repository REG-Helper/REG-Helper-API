-- CreateEnum
CREATE TYPE "Grade" AS ENUM ('A', 'B_PLUS', 'B', 'C_PLUS', 'C', 'D_PLUS', 'D', 'F', 'W');

-- AlterTable
ALTER TABLE "UserCourses" ADD COLUMN     "grade" "Grade";
