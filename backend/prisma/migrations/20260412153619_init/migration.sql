/*
  Warnings:

  - The primary key for the `ai_recommendations` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `hackathon_tags` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `hackathon_tags` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `hackathon_tags` table. All the data in the column will be lost.
  - You are about to drop the column `tag` on the `hackathon_tags` table. All the data in the column will be lost.
  - The primary key for the `hackathons` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `thumbnailUrl` on the `hackathons` table. All the data in the column will be lost.
  - The primary key for the `matching_requests` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `notifications` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `password_reset_tokens` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `refresh_tokens` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `skills` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `team_invitations` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `team_members` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `team_members` table. All the data in the column will be lost.
  - The primary key for the `teams` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `deletedAt` on the `teams` table. All the data in the column will be lost.
  - The primary key for the `user_skills` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `user_skills` table. All the data in the column will be lost.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[hackathonId,tagId]` on the table `hackathon_tags` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[teamId,userId]` on the table `team_members` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,skillId]` on the table `user_skills` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `tagId` to the `hackathon_tags` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deadline` to the `team_invitations` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ai_recommendations" DROP CONSTRAINT "ai_recommendations_matchingRequestId_fkey";

-- DropForeignKey
ALTER TABLE "hackathon_tags" DROP CONSTRAINT "hackathon_tags_hackathonId_fkey";

-- DropForeignKey
ALTER TABLE "matching_requests" DROP CONSTRAINT "matching_requests_hackathonId_fkey";

-- DropForeignKey
ALTER TABLE "matching_requests" DROP CONSTRAINT "matching_requests_userId_fkey";

-- DropForeignKey
ALTER TABLE "notifications" DROP CONSTRAINT "notifications_userId_fkey";

-- DropForeignKey
ALTER TABLE "password_reset_tokens" DROP CONSTRAINT "password_reset_tokens_userId_fkey";

-- DropForeignKey
ALTER TABLE "refresh_tokens" DROP CONSTRAINT "refresh_tokens_userId_fkey";

-- DropForeignKey
ALTER TABLE "team_invitations" DROP CONSTRAINT "team_invitations_receiverId_fkey";

-- DropForeignKey
ALTER TABLE "team_invitations" DROP CONSTRAINT "team_invitations_senderId_fkey";

-- DropForeignKey
ALTER TABLE "team_invitations" DROP CONSTRAINT "team_invitations_teamId_fkey";

-- DropForeignKey
ALTER TABLE "team_members" DROP CONSTRAINT "team_members_teamId_fkey";

-- DropForeignKey
ALTER TABLE "team_members" DROP CONSTRAINT "team_members_userId_fkey";

-- DropForeignKey
ALTER TABLE "teams" DROP CONSTRAINT "teams_hackathonId_fkey";

-- DropForeignKey
ALTER TABLE "teams" DROP CONSTRAINT "teams_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "user_skills" DROP CONSTRAINT "user_skills_skillId_fkey";

-- DropForeignKey
ALTER TABLE "user_skills" DROP CONSTRAINT "user_skills_userId_fkey";

-- AlterTable
ALTER TABLE "ai_recommendations" DROP CONSTRAINT "ai_recommendations_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "matchingRequestId" SET DATA TYPE TEXT,
ADD CONSTRAINT "ai_recommendations_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "ai_recommendations_id_seq";

-- AlterTable
ALTER TABLE "hackathon_tags" DROP CONSTRAINT "hackathon_tags_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "id",
DROP COLUMN "tag",
ADD COLUMN     "tagId" TEXT NOT NULL,
ALTER COLUMN "hackathonId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "hackathons" DROP CONSTRAINT "hackathons_pkey",
DROP COLUMN "thumbnailUrl",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "hackathons_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "hackathons_id_seq";

-- AlterTable
ALTER TABLE "matching_requests" DROP CONSTRAINT "matching_requests_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ALTER COLUMN "hackathonId" SET DATA TYPE TEXT,
ADD CONSTRAINT "matching_requests_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "matching_requests_id_seq";

-- AlterTable
ALTER TABLE "notifications" DROP CONSTRAINT "notifications_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ADD CONSTRAINT "notifications_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "notifications_id_seq";

-- AlterTable
ALTER TABLE "password_reset_tokens" DROP CONSTRAINT "password_reset_tokens_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ADD CONSTRAINT "password_reset_tokens_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "password_reset_tokens_id_seq";

-- AlterTable
ALTER TABLE "refresh_tokens" DROP CONSTRAINT "refresh_tokens_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ADD CONSTRAINT "refresh_tokens_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "refresh_tokens_id_seq";

-- AlterTable
ALTER TABLE "skills" DROP CONSTRAINT "skills_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "skills_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "skills_id_seq";

-- AlterTable
ALTER TABLE "team_invitations" DROP CONSTRAINT "team_invitations_pkey",
ADD COLUMN     "deadline" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "teamId" SET DATA TYPE TEXT,
ALTER COLUMN "senderId" SET DATA TYPE TEXT,
ALTER COLUMN "receiverId" SET DATA TYPE TEXT,
ADD CONSTRAINT "team_invitations_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "team_invitations_id_seq";

-- AlterTable
ALTER TABLE "team_members" DROP CONSTRAINT "team_members_pkey",
DROP COLUMN "id",
ALTER COLUMN "teamId" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "teams" DROP CONSTRAINT "teams_pkey",
DROP COLUMN "deletedAt",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "hackathonId" SET DATA TYPE TEXT,
ALTER COLUMN "ownerId" SET DATA TYPE TEXT,
ADD CONSTRAINT "teams_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "teams_id_seq";

-- AlterTable
ALTER TABLE "user_skills" DROP CONSTRAINT "user_skills_pkey",
DROP COLUMN "id",
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ALTER COLUMN "skillId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "users" DROP CONSTRAINT "users_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "users_id_seq";

-- CreateTable
CREATE TABLE "tags" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tags_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tags_name_key" ON "tags"("name");

-- CreateIndex
CREATE UNIQUE INDEX "hackathon_tags_hackathonId_tagId_key" ON "hackathon_tags"("hackathonId", "tagId");

-- CreateIndex
CREATE UNIQUE INDEX "team_members_teamId_userId_key" ON "team_members"("teamId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "user_skills_userId_skillId_key" ON "user_skills"("userId", "skillId");

-- AddForeignKey
ALTER TABLE "user_skills" ADD CONSTRAINT "user_skills_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_skills" ADD CONSTRAINT "user_skills_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "skills"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hackathon_tags" ADD CONSTRAINT "hackathon_tags_hackathonId_fkey" FOREIGN KEY ("hackathonId") REFERENCES "hackathons"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hackathon_tags" ADD CONSTRAINT "hackathon_tags_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teams" ADD CONSTRAINT "teams_hackathonId_fkey" FOREIGN KEY ("hackathonId") REFERENCES "hackathons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teams" ADD CONSTRAINT "teams_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "team_members" ADD CONSTRAINT "team_members_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "teams"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "team_members" ADD CONSTRAINT "team_members_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "team_invitations" ADD CONSTRAINT "team_invitations_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "teams"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "team_invitations" ADD CONSTRAINT "team_invitations_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "team_invitations" ADD CONSTRAINT "team_invitations_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "matching_requests" ADD CONSTRAINT "matching_requests_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "matching_requests" ADD CONSTRAINT "matching_requests_hackathonId_fkey" FOREIGN KEY ("hackathonId") REFERENCES "hackathons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ai_recommendations" ADD CONSTRAINT "ai_recommendations_matchingRequestId_fkey" FOREIGN KEY ("matchingRequestId") REFERENCES "matching_requests"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "refresh_tokens" ADD CONSTRAINT "refresh_tokens_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "password_reset_tokens" ADD CONSTRAINT "password_reset_tokens_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
