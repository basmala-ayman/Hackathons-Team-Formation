/*
  Warnings:

  - You are about to drop the column `description` on the `hackathons` table. All the data in the column will be lost.
  - You are about to drop the column `endDate` on the `hackathons` table. All the data in the column will be lost.
  - You are about to drop the column `source` on the `hackathons` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `hackathons` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "hackathons" DROP COLUMN "description",
DROP COLUMN "endDate",
DROP COLUMN "source",
DROP COLUMN "startDate",
ADD COLUMN     "thumbnailUrl" TEXT;
