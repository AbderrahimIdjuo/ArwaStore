/*
  Warnings:

  - You are about to drop the column `avances` on the `factures` table. All the data in the column will be lost.
  - You are about to drop the column `depense` on the `factures` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "factures" DROP COLUMN "avances",
DROP COLUMN "depense";
