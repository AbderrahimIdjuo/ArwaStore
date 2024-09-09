import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma"

export async function PUT(req , {params}){
    const id = params.id
    const {name ,tele , nbrArticls , ville , adress} = req.body
    
    const client = await prisma.clients.upsert({
        where : {id},
        data : {
                name,
                tele,
                nbrArticls,
                ville,
                adress 
        }
    })
    return NextResponse.json(client)
    
}