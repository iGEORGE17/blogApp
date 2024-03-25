'use server'
import { prisma } from "@/lib/prisma";

// get all posts
export const getAllPosts = async () => {
    const posts = await prisma.post.findMany({
        include: {
            author: true,
            category: true
        }
    })

    if(!posts) {
        throw new Error("err....")
    }

    return posts;
}


// get post by id
export const getPostById = async (id: any) => {
    const post = await prisma.post.findUnique({
        where: {
            id
        },
        include: {
            author: true,
            category: true
        }
    })

    if(!post) {
        throw new Error("err....")
    }

    return post;
}


export const getRelatedPosts = async (id: any) => {
            const post = await prisma.post.findUnique({
            where: {
                id
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

        return relatedPosts;
}