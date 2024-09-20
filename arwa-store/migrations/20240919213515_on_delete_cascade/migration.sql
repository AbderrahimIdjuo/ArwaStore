-- DropForeignKey
ALTER TABLE "commandes" DROP CONSTRAINT "commandes_clientID_fkey";

-- AddForeignKey
ALTER TABLE "commandes" ADD CONSTRAINT "commandes_clientID_fkey" FOREIGN KEY ("clientID") REFERENCES "clients"("id") ON DELETE CASCADE ON UPDATE CASCADE;
