/*
  Warnings:

  - You are about to drop the column `fraisTr` on the `commandes` table. All the data in the column will be lost.
  - You are about to drop the column `prixFin` on the `commandes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "commandes" DROP COLUMN "fraisTr",
DROP COLUMN "prixFin",
ADD COLUMN     "livraison" TEXT,
ADD COLUMN     "rest" TEXT;
