/*
  Warnings:

  - A unique constraint covering the columns `[manageToken]` on the table `Reservation` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Reservation" ADD COLUMN     "cancelledAt" TIMESTAMP(3),
ADD COLUMN     "cancelledBy" INTEGER,
ADD COLUMN     "completedAt" TIMESTAMP(3),
ADD COLUMN     "completedBy" INTEGER,
ADD COLUMN     "confirmedAt" TIMESTAMP(3),
ADD COLUMN     "confirmedBy" INTEGER,
ADD COLUMN     "manageToken" TEXT,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "rescheduledAt" TIMESTAMP(3),
ADD COLUMN     "rescheduledBy" INTEGER,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "tokenExpiry" TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX "Reservation_manageToken_key" ON "Reservation"("manageToken");

-- CreateIndex
CREATE INDEX "Reservation_email_idx" ON "Reservation"("email");

-- CreateIndex
CREATE INDEX "Reservation_status_idx" ON "Reservation"("status");

-- CreateIndex
CREATE INDEX "Reservation_manageToken_idx" ON "Reservation"("manageToken");
