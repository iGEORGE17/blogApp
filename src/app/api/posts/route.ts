import { prisma } from "@/lib/prisma";
import getCurrentUser from "@/utils/getCurrentUser";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {

    try {
    

    const currentUser = await getCurrentUser();

    const { title, tag, content, published, categoryId, imageUrl, publicId, authorId } = await request.json()


    const post = await prisma.post.create({
        data: {
            title,
            tag,
            content,
            published,
            category: {
                connect: {
                    id: categoryId
                }
            },
            imageUrl, 
            publicId,
            author: {
                connect: {
                    id: authorId
                }
            }
        }
    })

    if(!post) {
        return NextResponse.json({ message: "An error occurred...." }, { status: 400 })
    }

    return NextResponse.json({ post }, { status: 201 })        
        
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

 

}


export async function GET(request: NextRequest) {

    try {

        const posts = await prisma.post.findMany({
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