/*
  Warnings:

  - You are about to drop the column `clientNumber` on the `Invoice` table. All the data in the column will be lost.
  - Added the required column `clientId` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Invoice` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Invoice" DROP COLUMN "clientNumber",
ADD COLUMN     "clientId" INTEGER NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "Client" (
    "id" SERIAL NOT NULL,
    "clientNumber" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Client_clientNumber_key" ON "Client"("clientNumber");

-- CreateIndex
CREATE INDEX "Client_clientNumber_idx" ON "Client"("clientNumber");

-- CreateIndex
CREATE INDEX "Invoice_clientId_idx" ON "Invoice"("clientId");

-- CreateIndex
CREATE INDEX "Invoice_referenceMonth_idx" ON "Invoice"("referenceMonth");

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
