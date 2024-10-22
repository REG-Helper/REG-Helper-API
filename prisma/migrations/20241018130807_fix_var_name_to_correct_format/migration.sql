/*
  Warnings:

  - You are about to drop the column `name_en` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `name_th` on the `Job` table. All the data in the column will be lost.
  - Added the required column `nameEN` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nameTH` to the `Job` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Job" DROP COLUMN "name_en",
DROP COLUMN "name_th",
ADD COLUMN     "nameEN" TEXT NOT NULL,
ADD COLUMN     "nameTH" TEXT NOT NULL;
