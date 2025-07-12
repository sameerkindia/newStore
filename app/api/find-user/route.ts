import { prisma } from "@/db/prisma";
import { NextResponse } from "next/server";

export async function GET(request:any){
    console.log(request , "this is request")

    // const user = await prisma.user.findFirst({
    //     where: {
    //       email: credentials.email as string,
    //     },
    //   });

    return new Response("working")
}

export async function POST(request:any) {
    const payload = await request.json()
    // console.log(payload.email , "this POST is request payload")

    const user = await prisma.user.findFirst({
        where: {
          email: payload.email,
        },
      });

    const response = NextResponse.json({user})

    // console.log("this is from route", response.json())

    return response
    // return NextResponse().json({"user":user})
    // return new Response(user)
}