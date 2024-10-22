/*
  Warnings:

  - The primary key for the `Job` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Job` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Skill` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `name_en` on the `Skill` table. All the data in the column will be lost.
  - You are about to drop the column `name_th` on the `Skill` table. All the data in the column will be lost.
  - The `id` column on the `Skill` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `Skill2Course` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Skill2Job` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `nameEn` to the `Skill` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nameTh` to the `Skill` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Skill2Course" DROP CONSTRAINT "Skill2Course_course_id_fkey";

-- DropForeignKey
ALTER TABLE "Skill2Course" DROP CONSTRAINT "Skill2Course_skill_id_fkey";

-- DropForeignKey
ALTER TABLE "Skill2Job" DROP CONSTRAINT "Skill2Job_job_id_fkey";

-- DropForeignKey
ALTER TABLE "Skill2Job" DROP CONSTRAINT "Skill2Job_skill_id_fkey";

-- AlterTable
ALTER TABLE "Job" DROP CONSTRAINT "Job_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
ADD CONSTRAINT "Job_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Skill" DROP CONSTRAINT "Skill_pkey",
DROP COLUMN "name_en",
DROP COLUMN "name_th",
ADD COLUMN     "nameEn" TEXT NOT NULL,
ADD COLUMN     "nameTh" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
ADD CONSTRAINT "Skill_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "Skill2Course";

-- DropTable
DROP TABLE "Skill2Job";

-- CreateTable
CREATE TABLE "SkillCourseMapping" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "weight" INTEGER NOT NULL,
    "skillId" UUID NOT NULL,
    "courseId" TEXT NOT NULL,

    CONSTRAINT "SkillCourseMapping_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SkillJobMapping" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "weight" INTEGER NOT NULL,
    "skillId" UUID NOT NULL,
    "jobId" UUID NOT NULL,

    CONSTRAINT "SkillJobMapping_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SkillCourseMapping_skillId_courseId_key" ON "SkillCourseMapping"("skillId", "courseId");

-- CreateIndex
CREATE UNIQUE INDEX "SkillJobMapping_skillId_jobId_key" ON "SkillJobMapping"("skillId", "jobId");

-- AddForeignKey
ALTER TABLE "SkillCourseMapping" ADD CONSTRAINT "SkillCourseMapping_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "Skill"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SkillCourseMapping" ADD CONSTRAINT "SkillCourseMapping_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SkillJobMapping" ADD CONSTRAINT "SkillJobMapping_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "Skill"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SkillJobMapping" ADD CONSTRAINT "SkillJobMapping_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE CASCADE ON UPDATE CASCADE;
