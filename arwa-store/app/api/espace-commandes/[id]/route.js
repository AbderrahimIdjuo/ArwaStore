import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export async function DELETE(req, { params }) {
  const id = params.id;

  const commande = await prisma.commandes.delete({
    where: { id },
  });
  return NextResponse.json(commande);
}

export async function PUT(req, { params }) {
  const id = params.id;
  const body = await req.json();
  const {
    avance,
    description,
    livraison,
    nbrArticls,
    prixInt,
    rest,
    status,
    trakingNbr,
  } = body;

  const commande = await prisma.commandes.update({
    where: { id },
    data: {
      description,
      nbrArticls,
      prixInt,
      avance,
      livraison,
      rest,
      status,
      trakingNbr,
    },
  });
  return NextResponse.json(commande);
}

export async function GET(req , {params}) {
  const page = params.id
  const commandesPerPage = 10
  const Commandes = await prisma.commandes.findMany({
    skip : (page - 1)*commandesPerPage,
    take : commandesPerPage ,
    orderBy: {
        updatedAt: 'desc' 
    }
})
  const totalCommandes = await prisma.commandes.count(); 
  const totalPage = Math.ceil(totalCommandes /commandesPerPage)
  return NextResponse.json({Commandes , totalPage})

}