-- CreateEnum
CREATE TYPE "CourseType" AS ENUM ('LECTURE', 'PRACTICE');

-- CreateEnum
CREATE TYPE "CourseGroup" AS ENUM ('GENED');

-- CreateTable
CREATE TABLE "Course" (
    "id" TEXT NOT NULL,
    "nameEn" TEXT NOT NULL,
    "nameTh" TEXT NOT NULL,
    "descriptionEn" TEXT NOT NULL,
    "descriptionTh" TEXT NOT NULL,
    "credit" INTEGER NOT NULL,
    "creditStr" TEXT NOT NULL,
    "type" "CourseType" NOT NULL,
    "group" "CourseGroup" NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SectionTeachers" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "sectionId" UUID NOT NULL,
    "teacherId" UUID NOT NULL,

    CONSTRAINT "SectionTeachers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SectionTime" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "startAt" TIME NOT NULL,
    "endAt" TIME NOT NULL,
    "sectionId" UUID NOT NULL,

    CONSTRAINT "SectionTime_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Section" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "day" TEXT NOT NULL,
    "room" TEXT NOT NULL,
    "limit" INTEGER NOT NULL,
    "count" INTEGER NOT NULL,
    "queueLeft" INTEGER NOT NULL,
    "preCount" INTEGER NOT NULL,
    "midtermExamDate" TIMESTAMP(3) NOT NULL,
    "finalExamDate" TIMESTAMP(3) NOT NULL,
    "condition" TEXT,
    "courseId" TEXT NOT NULL,

    CONSTRAINT "Section_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Teacher" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "firstnameEn" TEXT NOT NULL,
    "lastnameEn" TEXT NOT NULL,
    "firstnameTh" TEXT NOT NULL,
    "lastnameTh" TEXT NOT NULL,

    CONSTRAINT "Teacher_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transcript" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Transcript_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserCourses" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "courseId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "UserCourses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "studentId" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "profileImage" TEXT NOT NULL,
    "googleOauthId" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("studentId")
);

-- CreateIndex
CREATE INDEX "SectionTeachers_teacherId_sectionId_idx" ON "SectionTeachers"("teacherId", "sectionId");

-- CreateIndex
CREATE UNIQUE INDEX "Transcript_userId_key" ON "Transcript"("userId");

-- CreateIndex
CREATE INDEX "UserCourses_userId_courseId_idx" ON "UserCourses"("userId", "courseId");

-- CreateIndex
CREATE UNIQUE INDEX "User_googleOauthId_key" ON "User"("googleOauthId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "SectionTeachers" ADD CONSTRAINT "SectionTeachers_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "Section"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SectionTeachers" ADD CONSTRAINT "SectionTeachers_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SectionTime" ADD CONSTRAINT "SectionTime_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "Section"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Section" ADD CONSTRAINT "Section_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transcript" ADD CONSTRAINT "Transcript_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("studentId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCourses" ADD CONSTRAINT "UserCourses_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCourses" ADD CONSTRAINT "UserCourses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("studentId") ON DELETE RESTRICT ON UPDATE CASCADE;
