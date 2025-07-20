/*
  Warnings:

  - You are about to drop the column `name` on the `Customer` table. All the data in the column will be lost.
  - Added the required column `dateOfBirth` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `passportNumber` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `placeOfResidence` to the `Customer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "name",
ADD COLUMN     "dateOfBirth" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL,
ADD COLUMN     "passportNumber" TEXT NOT NULL,
ADD COLUMN     "placeOfResidence" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Reservation" ALTER COLUMN "cancelledBy" DROP DEFAULT;

-- CreateIndex
CREATE INDEX "Customer_email_idx" ON "Customer"("email");

-- CreateIndex
CREATE INDEX "Customer_passportNumber_idx" ON "Customer"("passportNumber");
