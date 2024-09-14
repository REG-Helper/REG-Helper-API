-- DropForeignKey
ALTER TABLE "UserOauthProvider" DROP CONSTRAINT "UserOauthProvider_userId_fkey";

-- AddForeignKey
ALTER TABLE "UserOauthProvider" ADD CONSTRAINT "UserOauthProvider_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("studentId") ON DELETE CASCADE ON UPDATE CASCADE;
