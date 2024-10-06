-- AlterTable
ALTER TABLE "clients" ADD COLUMN     "sold" INTEGER;

-- CreateTable
CREATE TABLE "facteurs" (
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

    CONSTRAINT "facteurs_pkey" PRIMARY KEY ("id")
);
