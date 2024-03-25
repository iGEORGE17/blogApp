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

export async function PUT(request: NextRequest, { params }: any) {
    try {

        const { title, tag, content, published, categoryId, imageUrl, publicId, authorId } = await request.json()

        const post = await prisma.post.findUnique({
            where: {
                id: params.id
            }
        })

        if(!post) {
            return NextResponse.json({ message: "An error occurred...." }, { status: 400 })
        }  
        
        

        const updatedPost = await prisma.post.update({
            where: {
                id: params.id
            },
            data: {
                title: title || post?.title,
                tag: tag || post?.tag,
                content: content || post?.content,
                published: published || post?.published,
                category: {
                    connect: {
                        id: categoryId || post?.categoryId
                    }
                },
                imageUrl: imageUrl || post?.imageUrl, 
                publicId: publicId || post?.publicId,
                author: {
                    connect: {
                        id: authorId
                    }
                }
            },
            })

            return NextResponse.json({ updatedPost }, { status: 500 })
        
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}