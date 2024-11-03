import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";


export async function GET(req , {params}) {
  const {date , page } = params
  const facturesPerPage = 10
  if (!date) {
    return NextResponse.status(400).json({ error: 'Date is required.' });
  }

  try {

    const startDate = new Date(date); // Given start date
    const endDate = new Date(); // Current date

    // Ensure the times are correctly set for start and end dates
    startDate.setUTCHours(0, 0, 0, 0); // Start of the given date
    endDate.setUTCHours(23, 59, 59, 999); // End of the current date



    const Factures = await prisma.factures.findMany({
      where: {
        updatedAt: {
          gte: startDate,
          lte: endDate,
        },
      },
      skip : (page - 1)*facturesPerPage,
      take : facturesPerPage ,
      orderBy: {
        updatedAt: 'desc' 
    }
    });
    const totalFactures = await prisma.factures.count({
      where: {
        updatedAt: {
          gte: startDate,
          lte: endDate,
        },
      },
    }); 
    const totalPage = Math.ceil(totalFactures /facturesPerPage)
    return NextResponse.json({Factures , totalPage})
  } catch (error) {
    console.error('Error fetching records:', error);
    return NextResponse.status(500).json({ error: 'Internal server error.' });
  }
}