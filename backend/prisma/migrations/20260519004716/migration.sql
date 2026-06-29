/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `hackathons` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "FormationMethod" AS ENUM ('MANUAL', 'AUTO_MATCHED', 'INVITED');

-- CreateEnum
CREATE TYPE "HackathonSource" AS ENUM ('SCRAPED', 'USER_CREATED');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "NotificationType" ADD VALUE 'RECOMMENDATION_RECEIVED';
ALTER TYPE "NotificationType" ADD VALUE 'ROUND2_AVAILABLE';

-- AlterTable
ALTER TABLE "ai_recommendations" ADD COLUMN     "expiresAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "hackathons" ADD COLUMN     "createdBy" TEXT,
ADD COLUMN     "endDate" TIMESTAMP(3),
ADD COLUMN     "interestCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "source" "HackathonSource" NOT NULL DEFAULT 'SCRAPED',
ALTER COLUMN "applyLink" DROP NOT NULL,
ALTER COLUMN "location" DROP NOT NULL,
ALTER COLUMN "prizeAmount" DROP NOT NULL,
ALTER COLUMN "prizesCounts" DROP NOT NULL,
ALTER COLUMN "registrationsCount" DROP NOT NULL;

-- AlterTable
ALTER TABLE "matching_requests" ADD COLUMN     "projectId" TEXT,
ADD COLUMN     "queuePosition" INTEGER,
ADD COLUMN     "roundNumber" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "teamId" TEXT;

-- AlterTable
ALTER TABLE "teams" ADD COLUMN     "description" TEXT,
ADD COLUMN     "formationMethod" "FormationMethod" NOT NULL DEFAULT 'AUTO_MATCHED',
ADD COLUMN     "roles" TEXT[],
ADD COLUMN     "size" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "githubUrl" TEXT,
ADD COLUMN     "linkedinUrl" TEXT,
ADD COLUMN     "tachRole" TEXT;

-- CreateTable
CREATE TABLE "hackathon_interests" (
    "userId" TEXT NOT NULL,
    "hackathonId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "projects" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "interestsCount" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project_interests" (
    "userId" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "hackathon_interests_userId_hackathonId_key" ON "hackathon_interests"("userId", "hackathonId");

-- CreateIndex
CREATE UNIQUE INDEX "projects_teamId_key" ON "projects"("teamId");

-- CreateIndex
CREATE UNIQUE INDEX "project_interests_userId_projectId_key" ON "project_interests"("userId", "projectId");

-- CreateIndex
CREATE UNIQUE INDEX "hackathons_title_key" ON "hackathons"("title");

-- AddForeignKey
ALTER TABLE "hackathons" ADD CONSTRAINT "hackathons_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "matching_requests" ADD CONSTRAINT "matching_requests_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "teams"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "matching_requests" ADD CONSTRAINT "matching_requests_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hackathon_interests" ADD CONSTRAINT "hackathon_interests_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hackathon_interests" ADD CONSTRAINT "hackathon_interests_hackathonId_fkey" FOREIGN KEY ("hackathonId") REFERENCES "hackathons"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "projects_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "projects_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "teams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_interests" ADD CONSTRAINT "project_interests_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_interests" ADD CONSTRAINT "project_interests_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;
