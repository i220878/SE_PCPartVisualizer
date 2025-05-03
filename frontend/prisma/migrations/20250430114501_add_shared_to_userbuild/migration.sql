-- DropForeignKey
ALTER TABLE "UserBuild" DROP CONSTRAINT "UserBuild_authorId_fkey";

-- AlterTable
ALTER TABLE "UserBuild" ADD COLUMN     "shared" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "authorId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "UserBuild" ADD CONSTRAINT "UserBuild_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
