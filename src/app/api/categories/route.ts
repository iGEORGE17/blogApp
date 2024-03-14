import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {

    try { 

    const { name } = await request.json()

    const category = await prisma.category.create({
        data: {
            name
        }
    })

    return NextResponse.json({ category }, { status: 201 })        
        
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

}



export async function GET(request: NextRequest) {

    try { 

    const categories = await prisma.category.findMany({})

    return NextResponse.json({ categories }, { status: 200 })        
        
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

}