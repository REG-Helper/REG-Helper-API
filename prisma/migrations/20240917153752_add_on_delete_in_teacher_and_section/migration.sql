-- DropForeignKey
ALTER TABLE "SectionTeachers" DROP CONSTRAINT "SectionTeachers_sectionId_fkey";

-- DropForeignKey
ALTER TABLE "SectionTeachers" DROP CONSTRAINT "SectionTeachers_teacherId_fkey";

-- AddForeignKey
ALTER TABLE "SectionTeachers" ADD CONSTRAINT "SectionTeachers_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "Section"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SectionTeachers" ADD CONSTRAINT "SectionTeachers_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE CASCADE ON UPDATE CASCADE;
