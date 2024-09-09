import { NextResponse } from "next/server"
import prisma from "@/lib/prisma";

export async function POST(req){
    const  res = await req.json()
    const {name ,tele , nbrArticls , ville , adress} = res
    const result = await prisma.clients.create({
        data:{
            name,
            tele,
            nbrArticls,
            ville,
            adress 
        }
    })
    return NextResponse.json({result})
}

