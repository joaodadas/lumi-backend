-- CreateTable
CREATE TABLE "Invoice" (
    "id" SERIAL NOT NULL,
    "clientNumber" TEXT NOT NULL,
    "referenceMonth" TEXT NOT NULL,
    "energyConsumed" DOUBLE PRECISION NOT NULL,
    "energySCEEWithoutICMS" DOUBLE PRECISION NOT NULL,
    "totalAmount" DOUBLE PRECISION NOT NULL,
    "compensatedEnergy" DOUBLE PRECISION NOT NULL,
    "publicLightingContribution" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id")
);
