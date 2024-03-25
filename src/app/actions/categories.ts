"use server"
import { prisma } from "@/lib/prisma";


export const getCategories = async () => {
    const categories = await prisma.category.findMany()

    if(!categories) {
        throw new Error("err....")
    }


    return categories;
}