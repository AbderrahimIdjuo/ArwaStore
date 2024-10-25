import { NextResponse } from "next/server";
import prisma from "../../../../../../lib/prisma";

export async function GET(req, { params }) {
  const searchValue = params.searchValue;
  const status = params.status;
  const page = params.page
  const commandesPerPage = 3

  try {
    const commande = await prisma.commandes.findMany({
      where: {
        AND: [
          {
            status: status,
          },
          {
            OR: [
              {
                client: {
                  name: {
                    contains: searchValue,
                    mode: "insensitive", // Case-insensitive search
                  },
                },
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
              },
            ],
          },
        ],
      },
      skip : (page - 1)*commandesPerPage,
      take : commandesPerPage ,
      orderBy: {
          updatedAt: 'desc' 
  }});
  const totalCommandes = await prisma.commandes.count({
    where: {
      AND: [
        {
          status: status,
        },
        {
          OR: [
            {
              client: {
                name: {
                  contains: searchValue,
                  mode: "insensitive", // Case-insensitive search
                },
              },
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
            },
          ],
        },
      ],
    },
  }); 
  const totalPage = Math.ceil(totalCommandes /commandesPerPage)

    return NextResponse.json({commande , totalPage});
  } catch (error) {
    console.error("Error fetching commande:", error);
    return NextResponse.json(
      { error: "Failed to fetch commande" },
      { status: 500 }
    );
  }
}
