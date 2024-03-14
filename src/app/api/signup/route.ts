import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";




export async function POST(request: NextRequest) {
    try {
        
        const { name, email, password }: any = await request.json();

        const salt = bcrypt.genSaltSync(10);
        const hashpass = await bcrypt.hash(password, salt) 

        const user = await prisma.user.create({
            data: {
                name,
                email,                
                password: hashpass
            }
        })

        return NextResponse.json({ user }, { status: 201 })

    } catch (error: any) {
        return NextResponse.json({ error: error.message}, { status: 500 })
    }
} 