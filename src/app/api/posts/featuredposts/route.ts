import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";



export async function GET(request: NextRequest) {

    try {

        const posts = await prisma.post.findMany({
            where: {
                featured: true,
            },
            include: {
                category: true,
                author: true
            }
        })

        if(!posts) {
            return NextResponse.json({ message: "An error occurred...." }, { status: 400 })
        }

        return NextResponse.json({ posts }, { status: 200 })        
        
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    } 

}