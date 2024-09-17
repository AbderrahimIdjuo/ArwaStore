/*
  Warnings:

  - You are about to drop the column `prix` on the `commandes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "commandes" DROP COLUMN "prix",
ADD COLUMN     "fraisTr" TEXT,
ADD COLUMN     "prixFin" TEXT,
ADD COLUMN     "prixInt" TEXT;
