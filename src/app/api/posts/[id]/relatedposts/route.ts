import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"


export async function GET(request: NextRequest, { params }: any) {

    try {

        const post = await prisma.post.findUnique({
            where: {
                id: params.id
            }
        })

        const relatedPosts = await prisma.post.findMany({
            where: {
                id: {
                    not: post?.id
                },
                categoryId: {
                    equals: post?.categoryId
                }
            }
        });

        if(!relatedPosts) {
            return NextResponse.json({ message: "An error occurred...." }, { status: 400 })
        }

        return NextResponse.json({ relatedPosts }, { status: 200 })        
        
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    } 

}