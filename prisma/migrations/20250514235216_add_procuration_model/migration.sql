-- CreateTable
CREATE TABLE "Procuration" (
    "id" SERIAL NOT NULL,
    "delegator" JSONB NOT NULL,
    "delegate" JSONB NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "city" TEXT NOT NULL,
    "expenses" JSONB NOT NULL,
    "services" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Procuration_pkey" PRIMARY KEY ("id")
);
