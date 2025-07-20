/*
  Warnings:

  - You are about to drop the column `completedBy` on the `Reservation` table. All the data in the column will be lost.
  - You are about to drop the column `confirmedBy` on the `Reservation` table. All the data in the column will be lost.
  - You are about to drop the column `rescheduledBy` on the `Reservation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Reservation" DROP COLUMN "completedBy",
DROP COLUMN "confirmedBy",
DROP COLUMN "rescheduledBy",
ADD COLUMN     "reason" TEXT;
