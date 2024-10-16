// import { NextResponse } from "next/server";
// import prisma from "@/lib/prisma";

// export async function POST(req) {
//   const resopns = await req.json();
//   const { name, tele, ville, adress } = resopns;
//   const result = await prisma.clients.create({
//     data: {
//       name,
//       tele,
//       ville,
//       adress,
//     },
//   });
//   return NextResponse.json({ result });
// }

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req) {
  try {
    const resopns = await req.json();
    const { name, tele, ville, adress } = resopns;

    const result = await prisma.clients.create({
      data: {
        name,
        tele,
        ville,
        adress,
      },
    });

    return NextResponse.json({ result });
  } catch (error) {
    if (error.code === 'P2002') {
      // Handle unique constraint error (e.g., duplicate tele)
      return NextResponse.json({ message: 'Duplicate field error: A record with this value already exists.' }, { status: 409 });
    }
    return NextResponse.json({ message: 'An unexpected error occurred.' }, { status: 500 });
  }
}

export async function GET(req) {
  const Clients = await prisma.clients.findMany({
    orderBy: {
      updatedAt: "desc",
    },
  });
  return NextResponse.json({ Clients });
}
