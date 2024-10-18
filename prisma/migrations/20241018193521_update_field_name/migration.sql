/*
  Warnings:

  - You are about to drop the column `nameEN` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `nameTH` on the `Job` table. All the data in the column will be lost.
  - Added the required column `nameEn` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nameTh` to the `Job` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Job" DROP COLUMN "nameEN",
DROP COLUMN "nameTH",
ADD COLUMN     "nameEn" TEXT NOT NULL,
ADD COLUMN     "nameTh" TEXT NOT NULL;
