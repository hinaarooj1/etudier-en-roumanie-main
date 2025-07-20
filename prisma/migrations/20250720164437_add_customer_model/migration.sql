-- AlterTable
ALTER TABLE "Reservation" ADD COLUMN     "completedBy" INTEGER,
ALTER COLUMN "cancelledBy" SET DATA TYPE TEXT;
