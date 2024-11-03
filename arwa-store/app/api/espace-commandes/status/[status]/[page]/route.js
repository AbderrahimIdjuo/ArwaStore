import { NextResponse } from "next/server";
import prisma from "../../../../../../lib/prisma";
export async function GET(req , {params}) {
    const status = params.status
    const page = params.page
    const commandesPerPage = 10
    
    const Commandes = await prisma.commandes.findMany({
where:{
    status : status
},
  skip : (page - 1)*commandesPerPage,
  take : commandesPerPage ,
  orderBy: {
      updatedAt: 'desc' 
  }})
  const totalCommandes = await prisma.commandes.count({
    where:{
      status : status
  }
  }); 
  const totalPage = Math.ceil(totalCommandes /commandesPerPage)
    return NextResponse.json({Commandes , totalPage}) 
  }
