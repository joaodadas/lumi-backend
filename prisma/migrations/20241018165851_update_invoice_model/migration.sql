/*
  Warnings:

  - You are about to drop the column `energySCEEWithoutICMS` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `publicLightingContribution` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `totalAmount` on the `Invoice` table. All the data in the column will be lost.
  - Added the required column `compensatedEnergyValue` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `energyConsumedValue` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `energySCEEE` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `energySCEEValue` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gdSavings` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `publicLightingValue` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalEnergyConsumption` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalValueWithoutGD` to the `Invoice` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Invoice" DROP COLUMN "energySCEEWithoutICMS",
DROP COLUMN "publicLightingContribution",
DROP COLUMN "totalAmount",
ADD COLUMN     "compensatedEnergyValue" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "energyConsumedValue" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "energySCEEE" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "energySCEEValue" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "gdSavings" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "pdfFile" BYTEA,
ADD COLUMN     "publicLightingValue" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "totalEnergyConsumption" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "totalValueWithoutGD" DOUBLE PRECISION NOT NULL;
