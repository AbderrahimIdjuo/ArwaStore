/*
  Warnings:

  - You are about to drop the column `nbrArticls` on the `clients` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "clients" DROP COLUMN "nbrArticls",
ADD COLUMN     "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "commandes" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "nbrArticls" TEXT,
    "description" TEXT,
    "prix" TEXT,
    "avance" TEXT,
    "clientID" TEXT NOT NULL,
    "trakingNbr" TEXT,

    CONSTRAINT "commandes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "commandes" ADD CONSTRAINT "commandes_clientID_fkey" FOREIGN KEY ("clientID") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
