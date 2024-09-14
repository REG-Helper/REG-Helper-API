-- DropForeignKey
ALTER TABLE "Transcript" DROP CONSTRAINT "Transcript_userId_fkey";

-- AddForeignKey
ALTER TABLE "Transcript" ADD CONSTRAINT "Transcript_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("studentId") ON DELETE CASCADE ON UPDATE CASCADE;
