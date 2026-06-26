/*
  Warnings:

  - The values [AI,HEALTHCARE,OTHER] on the enum `InterestType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `name` on the `hackathon_interests` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[invitationId]` on the table `ai_recommendation_members` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "InterestType_new" AS ENUM ('AR_VR', 'BEGINNER_FRIENDLY', 'BLOCKCHAIN', 'COMMUNICATION', 'CYBERSECURITY', 'DATABASES', 'DESIGN', 'DEVOPS', 'ECOMMERCE_RETAIL', 'EDUCATION', 'ENTERPRISE', 'FINTECH', 'GAMING', 'HEALTH', 'IOT', 'LIFEHACKS', 'LOW_NO_CODE', 'MACHINE_LEARNING_AI', 'MOBILE', 'MUSIC_ART', 'OPEN_ENDED', 'PRODUCTIVITY', 'QUANTUM', 'ROBOTIC_PROCESS_AUTOMATION', 'SERVERLESS', 'SOCIAL_GOOD', 'VOICE_SKILLS', 'WEB');
ALTER TABLE "users" ALTER COLUMN "intrestes" TYPE "InterestType_new"[] USING ("intrestes"::text::"InterestType_new"[]);
ALTER TYPE "InterestType" RENAME TO "InterestType_old";
ALTER TYPE "InterestType_new" RENAME TO "InterestType";
DROP TYPE "public"."InterestType_old";
COMMIT;

-- AlterTable
ALTER TABLE "ai_recommendation_members" ADD COLUMN     "invitationId" TEXT;

-- AlterTable
ALTER TABLE "hackathon_interests" DROP COLUMN "name";

-- CreateIndex
CREATE UNIQUE INDEX "ai_recommendation_members_invitationId_key" ON "ai_recommendation_members"("invitationId");

-- AddForeignKey
ALTER TABLE "ai_recommendation_members" ADD CONSTRAINT "ai_recommendation_members_invitationId_fkey" FOREIGN KEY ("invitationId") REFERENCES "team_invitations"("id") ON DELETE SET NULL ON UPDATE CASCADE;
