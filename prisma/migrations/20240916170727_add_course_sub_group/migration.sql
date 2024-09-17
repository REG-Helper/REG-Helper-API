/*
  Warnings:

  - A unique constraint covering the columns `[firstnameTh,lastnameTh]` on the table `Teacher` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[firstnameEn,lastnameEn]` on the table `Teacher` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `subGroup` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `semester` to the `Section` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `Section` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `day` on the `Section` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "CourseSubGroup" AS ENUM ('FREE_ELEC', 'FUND', 'LANG', 'FAC_SPEC', 'GENED_ELEC', 'CORE', 'REQUIRED', 'ELEC_REQ', 'ALT_STUDY', 'MAJOR_ELEC');

-- CreateEnum
CREATE TYPE "DayOfWeek" AS ENUM ('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'USER');

-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "subGroup" "CourseSubGroup" NOT NULL;

-- AlterTable
ALTER TABLE "Section" ADD COLUMN     "semester" INTEGER NOT NULL,
ADD COLUMN     "year" INTEGER NOT NULL,
DROP COLUMN "day",
ADD COLUMN     "day" "DayOfWeek" NOT NULL;

-- AlterTable
ALTER TABLE "Teacher" ALTER COLUMN "firstnameEn" DROP NOT NULL,
ALTER COLUMN "lastnameEn" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'USER';

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_firstnameTh_lastnameTh_key" ON "Teacher"("firstnameTh", "lastnameTh");

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_firstnameEn_lastnameEn_key" ON "Teacher"("firstnameEn", "lastnameEn");
