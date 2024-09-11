import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma"

export async function PUT(req , {params}){
    const id = params.id
    const body = await req.json()
    const {name ,tele , nbrArticls , ville , adress} = body
    
    const client = await prisma.clients.update({
        where : {id},
        data : {
                name ,
                tele,
                nbrArticls,
                ville,
                adress 
        }
    })
    return NextResponse.json(client)
    
}