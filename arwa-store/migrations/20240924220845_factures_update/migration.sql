/*
  Warnings:

  - You are about to drop the `facteurs` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "facteurs";

-- CreateTable
CREATE TABLE "factures" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "barid" INTEGER,
    "chaabi" INTEGER,
    "cih" INTEGER,
    "cash" INTEGER,
    "cashPlus" INTEGER,
    "beyou" INTEGER,
    "fornisseur" INTEGER,
    "avances" INTEGER,
    "depense" INTEGER,
    "credit_negatif" INTEGER,
    "credit_positif" INTEGER,
    "non_paye" INTEGER,
    "non_livre" INTEGER,
    "capital_reel" INTEGER,
    "capital_general" INTEGER,

    CONSTRAINT "factures_pkey" PRIMARY KEY ("id")
);
