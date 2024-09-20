/*
  Warnings:

  - A unique constraint covering the columns `[name,courseId]` on the table `Section` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Section_name_courseId_key" ON "Section"("name", "courseId");
