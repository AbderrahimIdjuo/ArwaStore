import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";
export async function GET(req , {params}) {
    const status = params.status
    const Commandes = await prisma.commandes.findMany({
where:{
    status : status
}
  })
    return NextResponse.json(Commandes) 
  }