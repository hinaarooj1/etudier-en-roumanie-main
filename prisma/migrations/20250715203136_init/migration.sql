/*
  Warnings:

  - You are about to drop the column `createdAt` on the `TimeSlotConfig` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `TimeSlotConfig` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "TimeSlotConfig" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ALTER COLUMN "startTime" SET DEFAULT '09:00',
ALTER COLUMN "endTime" SET DEFAULT '17:00',
ALTER COLUMN "interval" SET DEFAULT 30;
