/*
  Warnings:

  - A unique constraint covering the columns `[clientId,referenceMonth]` on the table `Invoice` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `installationNumber` to the `Client` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Client" ADD COLUMN     "installationNumber" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Invoice_clientId_referenceMonth_key" ON "Invoice"("clientId", "referenceMonth");
