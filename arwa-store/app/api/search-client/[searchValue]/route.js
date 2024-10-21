import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma"

export async function GET(req, { params }) {
  const searchValue  = params.searchValue;
  
  try {
    const client = await prisma.clients.findMany({
        where: {
            OR: [
              {
                name: {
                  contains: searchValue,
                  mode: "insensitive", // Case-insensitive search
                },
              },
              {
                tele: {
                  contains: searchValue,
                  mode: "insensitive", // Case-insensitive search
                },
              },
              {
                ville: {
                  contains: searchValue,
                  mode: "insensitive", // Case-insensitive search
                },
              }
            ],
          },
    });

    return NextResponse.json(client);
  } catch (error) {
    console.error("Error fetching clients:", error);
    return NextResponse.json({ error: "Failed to fetch clients" }, { status: 500 });
  }
}


