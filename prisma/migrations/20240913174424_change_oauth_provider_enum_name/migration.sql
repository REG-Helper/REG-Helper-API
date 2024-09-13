/*
  Warnings:

  - The `provider` column on the `UserOauthProvider` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "OAuthProvider" AS ENUM ('GOOGLE');

-- AlterTable
ALTER TABLE "UserOauthProvider" DROP COLUMN "provider",
ADD COLUMN     "provider" "OAuthProvider" NOT NULL DEFAULT 'GOOGLE';

-- DropEnum
DROP TYPE "OauthProvider";

-- CreateIndex
CREATE UNIQUE INDEX "UserOauthProvider_userId_provider_key" ON "UserOauthProvider"("userId", "provider");
