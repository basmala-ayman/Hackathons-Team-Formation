/*
  Warnings:

  - You are about to drop the column `tachRole` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "tachRole",
ADD COLUMN     "techRole" TEXT;
