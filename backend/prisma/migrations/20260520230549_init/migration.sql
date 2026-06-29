/*
  Warnings:

  - You are about to drop the column `compatibilityScore` on the `ai_recommendations` table. All the data in the column will be lost.
  - You are about to drop the column `techRole` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[devpostId]` on the table `hackathons` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `hackathon_interests` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "InterestType" AS ENUM ('AI', 'HEALTHCARE', 'FINTECH', 'EDUCATION', 'GAMING', 'OTHER');

-- DropIndex
DROP INDEX "hackathons_title_key";

-- AlterTable
ALTER TABLE "ai_recommendations" DROP COLUMN "compatibilityScore";

-- AlterTable
ALTER TABLE "hackathon_interests" ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "hackathons" ADD COLUMN     "devpostId" TEXT;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "techRole",
ADD COLUMN     "intrestes" "InterestType"[],
ADD COLUMN     "techRoles" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- CreateTable
CREATE TABLE "ai_identity_maps" (
    "id" SERIAL NOT NULL,
    "entityId" TEXT NOT NULL,
    "entityType" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ai_identity_maps_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ai_identity_maps_entityId_entityType_key" ON "ai_identity_maps"("entityId", "entityType");

-- CreateIndex
CREATE UNIQUE INDEX "hackathons_devpostId_key" ON "hackathons"("devpostId");
