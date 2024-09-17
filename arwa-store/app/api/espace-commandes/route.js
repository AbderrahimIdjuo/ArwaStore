import { NextResponse } from "next/server"
import prisma from "@/lib/prisma";

export async function POST(req){
    try {
        const res = await req.json();
        const {
          avance,
          clientID,
          description,
          livraison,
          nbrArticls,
          prixInt,
          rest,
          status
        } = res;
    console.log(res);
    
        const result = await prisma.commandes.create({
          data: {
            clientID,
            description,
            nbrArticls,
            prixInt,
            avance,
            livraison,            
            rest,
            status
          }
        });
    
        return NextResponse.json({ result });
      } catch (error) {
        console.error("Error creating commande:", error);
        return NextResponse.json({ error: 'Failed to create the commande' }, { status: 500 });
      }
}

export async function GET(req){
    const Commandes = await prisma.commandes.findMany({
        orderBy: {
            updatedAt: 'desc' 
        }
    })
    return NextResponse.json({Commandes})
}