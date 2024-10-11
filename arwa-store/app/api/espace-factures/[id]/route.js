import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma"

export async function DELETE(req , {params}){
    const id = params.id
    
    const facture = await prisma.factures.delete({
        where : {id}
    })
    return NextResponse.json(facture)
    
}

export async function PUT(req , {params}){
    const id = params.id
    const body = await req.json()
    const {
        barid,
        cih,
        beyou,
        cash,
        cashPlus,
        chaabi,
        fornisseur,
        creditNegatif,
        creditPositif,
        nonPaye,
        nonLivre,
      } = body
      const capital_reel = parseInt(barid , 10) + parseInt(cih , 10) + parseInt(beyou , 10) + parseInt(cash , 10) + 
      parseInt(fornisseur , 10) + parseInt(cashPlus , 10)  - parseInt(creditNegatif , 10)
      const capital_general = capital_reel + parseInt(nonLivre , 10) + parseInt(nonPaye , 10) + parseInt(creditPositif , 10)
    const facture = await prisma.factures.update({
        where : {id},
        data:{
            barid : parseInt(barid , 10),
            cih: parseInt(cih , 10),
            beyou: parseInt(beyou , 10),
            cash: parseInt(cash , 10),
            cashPlus: parseInt(cashPlus , 10),
            chaabi: parseInt(chaabi , 10),
            fornisseur: parseInt(fornisseur , 10),
            credit_negatif: parseInt(creditNegatif , 10),
            credit_positif: parseInt(creditPositif , 10),
            non_paye: parseInt(nonPaye , 10),
            non_livre: parseInt(nonLivre , 10),
            capital_reel : capital_reel , 
            capital_general : capital_general
        }
    })
    return NextResponse.json(facture)
    
}

export async function GET(req , {params}){
    const page = params.id
    const factures = await prisma.factures.findMany({
        skip : (page - 1)*5,
        take : 5 ,
        orderBy: {
            updatedAt: 'desc' 
        }
    })
    return NextResponse.json({factures})
}