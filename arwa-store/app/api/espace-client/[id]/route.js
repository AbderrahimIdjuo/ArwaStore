import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma"

export async function DELETE(req , {params}){
    const id = params.id
    
    const client = await prisma.clients.delete({
        where : {id}
    })
    return NextResponse.json(client)
    
}

export async function PUT(req , {params}){
    const id = params.id
    const body = await req.json()
    const {name ,tele , ville , adress} = body
    
    const client = await prisma.clients.update({
        where : {id},
        data : {
                name ,
                tele,
                ville,
                adress 
        }
    })
    return NextResponse.json(client)
    
}