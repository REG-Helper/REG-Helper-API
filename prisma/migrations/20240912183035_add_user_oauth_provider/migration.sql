/*
  Warnings:

  - You are about to drop the column `googleOauthId` on the `User` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "OauthProvider" AS ENUM ('GOOGLE');

-- DropIndex
DROP INDEX "User_googleOauthId_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "googleOauthId";

-- CreateTable
CREATE TABLE "UserOauthProvider" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "provider" "OauthProvider" NOT NULL DEFAULT 'GOOGLE',
    "userId" TEXT NOT NULL,

    CONSTRAINT "UserOauthProvider_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserOauthProvider_userId_provider_key" ON "UserOauthProvider"("userId", "provider");

-- AddForeignKey
ALTER TABLE "UserOauthProvider" ADD CONSTRAINT "UserOauthProvider_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("studentId") ON DELETE RESTRICT ON UPDATE CASCADE;
