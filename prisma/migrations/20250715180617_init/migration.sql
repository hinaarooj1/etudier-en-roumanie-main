-- CreateTable
CREATE TABLE "TimeSlotConfig" (
    "id" SERIAL NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "interval" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TimeSlotConfig_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DisabledSlot" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3),
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "isRecurring" BOOLEAN NOT NULL DEFAULT false,
    "dayOfWeek" INTEGER,
    "reason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DisabledSlot_pkey" PRIMARY KEY ("id")
);
