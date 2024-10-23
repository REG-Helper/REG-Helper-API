-- CreateTable
CREATE TABLE "SkillCourseMapping" (
    "id" TEXT NOT NULL,
    "from" TEXT NOT NULL,
    "fromTh" TEXT NOT NULL,
    "fromType" TEXT NOT NULL,
    "to" TEXT NOT NULL,
    "toTh" TEXT NOT NULL,
    "toType" TEXT NOT NULL,
    "weight" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SkillCourseMapping_pkey" PRIMARY KEY ("id")
);
