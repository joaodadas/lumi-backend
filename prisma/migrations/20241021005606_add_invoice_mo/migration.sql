/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `pdfFile` on the `Invoice` table. All the data in the column will be lost.
  - You are about to alter the column `energyConsumed` on the `Invoice` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `compensatedEnergy` on the `Invoice` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `energySCEEE` on the `Invoice` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `totalEnergyConsumption` on the `Invoice` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Invoice" DROP COLUMN "createdAt",
DROP COLUMN "pdfFile",
ALTER COLUMN "energyConsumed" SET DATA TYPE INTEGER,
ALTER COLUMN "compensatedEnergy" SET DATA TYPE INTEGER,
ALTER COLUMN "energySCEEE" SET DATA TYPE INTEGER,
ALTER COLUMN "totalEnergyConsumption" SET DATA TYPE INTEGER;
