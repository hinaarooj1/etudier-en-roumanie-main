/*
  Warnings:

  - The `cancelledBy` column on the `Reservation` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Reservation" ADD COLUMN     "confirmedBy" INTEGER,
ADD COLUMN     "rescheduledBy" INTEGER,
DROP COLUMN "cancelledBy",
ADD COLUMN     "cancelledBy" INTEGER;
