/*
  Warnings:

  - You are about to drop the `customers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "customers";

-- CreateTable
CREATE TABLE "Customer" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "verifyToken" TEXT,
    "verifyTokenExpiry" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Customer_email_key" ON "Customer"("email");
