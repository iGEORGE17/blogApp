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


// create post 
// export const createPost = async(data:any) => {
    
//     await prisma.post.create({
//     data: {
//         title:data.title,
//         tag: data.tag,
//         content: data.content,
//         imageUrl: data.imageUrl,
//         category: {
//             connect: {
//                 id: data.categoryId
//             }
//         },
//         author: {
//             connect: {
//                 id: data.authorId
//             }
//         },
//         featured: data.featured,
//         published: data.published
//     }

// })
// }


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