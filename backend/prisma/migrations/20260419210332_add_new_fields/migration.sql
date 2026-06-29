-- AlterTable
ALTER TABLE "hackathons" ADD COLUMN     "location" TEXT NOT NULL DEFAULT 'Online',
ADD COLUMN     "organization" TEXT,
ADD COLUMN     "prizeAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "prizesCounts" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "registrationsCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "remainingTime" TEXT,
ADD COLUMN     "slug" TEXT,
ADD COLUMN     "submissionPeriod" TEXT;
