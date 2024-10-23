import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma"
import { ceil } from "lodash";

export async function GET(req, { params }) {
  const {searchValue , page}  = params;
  const clientPerPage = 6
  
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
          skip : (page - 1)*clientPerPage,
          take : clientPerPage ,
          orderBy: {
              updatedAt: 'desc' 
          }
    });
    const totalClients = await prisma.clients.count({
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
    const totalPage = Math.ceil(totalClients / clientPerPage)
    return NextResponse.json({client , totalPage});
  } catch (error) {
    console.error("Error fetching clients:", error);
    return NextResponse.json({ error: "Failed to fetch clients" }, { status: 500 });
  }
}


