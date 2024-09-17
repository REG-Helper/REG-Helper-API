-- DropForeignKey
ALTER TABLE "Section" DROP CONSTRAINT "Section_courseId_fkey";

-- DropForeignKey
ALTER TABLE "SectionTime" DROP CONSTRAINT "SectionTime_sectionId_fkey";

-- DropForeignKey
ALTER TABLE "UserCourses" DROP CONSTRAINT "UserCourses_courseId_fkey";

-- DropForeignKey
ALTER TABLE "UserCourses" DROP CONSTRAINT "UserCourses_userId_fkey";

-- AddForeignKey
ALTER TABLE "SectionTime" ADD CONSTRAINT "SectionTime_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "Section"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Section" ADD CONSTRAINT "Section_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCourses" ADD CONSTRAINT "UserCourses_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCourses" ADD CONSTRAINT "UserCourses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("studentId") ON DELETE CASCADE ON UPDATE CASCADE;
