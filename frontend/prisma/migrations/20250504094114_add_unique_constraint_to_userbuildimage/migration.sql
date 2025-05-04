/*
  Warnings:

  - A unique constraint covering the columns `[userBuildId]` on the table `UserBuildImage` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UserBuildImage_userBuildId_key" ON "UserBuildImage"("userBuildId");
