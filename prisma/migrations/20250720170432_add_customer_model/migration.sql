/*
  Warnings:

  - You are about to drop the column `completedBy` on the `Reservation` table. All the data in the column will be lost.
  - You are about to drop the column `confirmedAt` on the `Reservation` table. All the data in the column will be lost.
  - You are about to drop the column `confirmedBy` on the `Reservation` table. All the data in the column will be lost.
  - You are about to drop the column `rescheduledAt` on the `Reservation` table. All the data in the column will be lost.
  - You are about to drop the column `rescheduledBy` on the `Reservation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Reservation" DROP COLUMN "completedBy",
DROP COLUMN "confirmedAt",
DROP COLUMN "confirmedBy",
DROP COLUMN "rescheduledAt",
DROP COLUMN "rescheduledBy",
ALTER COLUMN "status" SET DEFAULT 'CONFIRMED',
ALTER COLUMN "cancelledBy" SET DEFAULT 'user';
