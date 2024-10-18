-- CreateTable
CREATE TABLE "Job" (
    "id" TEXT NOT NULL,
    "name_en" TEXT NOT NULL,
    "name_th" TEXT NOT NULL,

    CONSTRAINT "Job_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Skill2Course" (
    "id" TEXT NOT NULL,
    "weight" INTEGER NOT NULL,
    "skill_id" TEXT NOT NULL,
    "course_id" TEXT NOT NULL,

    CONSTRAINT "Skill2Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Skill2Job" (
    "id" TEXT NOT NULL,
    "weight" INTEGER NOT NULL,
    "skill_id" TEXT NOT NULL,
    "job_id" TEXT NOT NULL,

    CONSTRAINT "Skill2Job_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Skill2Course_skill_id_course_id_key" ON "Skill2Course"("skill_id", "course_id");

-- CreateIndex
CREATE UNIQUE INDEX "Skill2Job_skill_id_job_id_key" ON "Skill2Job"("skill_id", "job_id");

-- AddForeignKey
ALTER TABLE "Skill2Course" ADD CONSTRAINT "Skill2Course_skill_id_fkey" FOREIGN KEY ("skill_id") REFERENCES "Skill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Skill2Course" ADD CONSTRAINT "Skill2Course_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Skill2Job" ADD CONSTRAINT "Skill2Job_skill_id_fkey" FOREIGN KEY ("skill_id") REFERENCES "Skill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Skill2Job" ADD CONSTRAINT "Skill2Job_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "Job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
