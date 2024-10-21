import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma"

export async function GET(req, { params }) {
  const searchValue  = params.searchValue;
  
  try {
    const commande = await prisma.commandes.findMany({
        where: {
            OR: [
              {
                client: {
                  name :{
                  contains: searchValue,
                  mode: "insensitive", // Case-insensitive search
                }}
              },
              {
                description: {
                  contains: searchValue,
                  mode: "insensitive", // Case-insensitive search
                },
              },
              {
                trakingNbr: {
                  contains: searchValue,
                  mode: "insensitive", // Case-insensitive search
                },
              }
            ],
          },
    });

    return NextResponse.json(commande);
  } catch (error) {
    console.error("Error fetching commande:", error);
    return NextResponse.json({ error: "Failed to fetch commande" }, { status: 500 });
  }
}


