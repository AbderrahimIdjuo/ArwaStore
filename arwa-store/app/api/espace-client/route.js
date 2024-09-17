import { NextResponse } from "next/server"
import prisma from "@/lib/prisma";

export async function POST(req){
    const  res = await req.json()
    const {name ,tele , ville , adress} = res
    const result = await prisma.clients.create({
        data:{
            name,
            tele,
            ville,
            adress 
        }
    })
    return NextResponse.json({result})
}

export async function GET(req){
    const Clients = await prisma.clients.findMany({
        orderBy: {
            updatedAt: 'desc' 
        }
    })
    return NextResponse.json({Clients})
}