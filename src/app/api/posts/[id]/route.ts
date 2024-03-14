import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"


export async function GET(request: NextRequest, { params }: any) {

    try {

        const post = await prisma.post.findUnique({
            where: {
                id: params.id
            }
        })

        if(!post) {
            return NextResponse.json({ message: "An error occurred...." }, { status: 400 })
        }

        await prisma.post.update({
            where: {
                id: params.id
            },
            data: {
                views: {
                    increment: 1,
                }
            }
        })

        return NextResponse.json({ post }, { status: 200 })        
        
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    } 

}

export async function PUT() {
    try {

        const updatePosts = await prisma.post.updateMany({
            data: {
                views: {
                increment: 1,
                },
                likes: {
                increment: 1,
                },
            },
            })
        
    } catch (error) {
        
    }
}