-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "InvitationStatus" ADD VALUE 'EXPIRED';
ALTER TYPE "InvitationStatus" ADD VALUE 'CANCELLED';

-- AlterEnum
ALTER TYPE "RecommendationStatus" ADD VALUE 'EXPIRED';

-- CreateTable
CREATE TABLE "ai_recommendation_members" (
    "id" TEXT NOT NULL,
    "recommendationId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "status" "InvitationStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ai_recommendation_members_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ai_recommendation_members_recommendationId_userId_key" ON "ai_recommendation_members"("recommendationId", "userId");

-- AddForeignKey
ALTER TABLE "ai_recommendation_members" ADD CONSTRAINT "ai_recommendation_members_recommendationId_fkey" FOREIGN KEY ("recommendationId") REFERENCES "ai_recommendations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ai_recommendation_members" ADD CONSTRAINT "ai_recommendation_members_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
