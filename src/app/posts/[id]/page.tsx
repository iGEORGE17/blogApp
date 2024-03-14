"use client"
import { getPostById, getRelatedPosts } from "@/app/actions/posts"
import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"

export default function postDetail({ params }: { params: { id: string } }) {
    const [post, setPost] = useState({})
    const [relatedPost, setRelatedPost] = useState([])

    const { id } = params;


    useEffect(() => {

        const fetchPostById = async() => {
            const res = await getPostById(id);
            setPost(res)
        }

        const fetchRelatedPosts = async() => {
            const res = await getRelatedPosts(id)
            setRelatedPost(res)
        }

        fetchPostById();
        fetchRelatedPosts();

    },[id])

  return (
    <section className="flex min-h-screen lg:flex-col w-full">
        <div className="mx-[5%] py-[6%]">
            <div className="flex lg:justify-between lg:items-stretch lg:gap-6 w-full">
                <div className="lg:w-9/12 ">
                    <h1 className="text-3xl font-bold">{post?.title}</h1>
                    <hr className="my-2" />
                    <div className="relative">
                        <Image src={post?.imageUrl} alt={post?.title} width={800} height={450} className="" />
                    </div>
                    <hr className="my-2" />
                    <p className="leading-9">{post?.content}</p>
                </div>
                <div className="border lg:w-3/12 lg:sticky top-0">
                    <h1 className="font-bold">Related Posts</h1>
                    <hr className="" />
                    {
                        relatedPost.map((rpost) => (
                            <Link href={`/posts/${rpost.id}`} key={rpost?.id}>
                                <div className="">
                                    <h1 className="text-sm font-bold">{rpost?.title}</h1>
                                </div>
                            </Link>
                        ))
                    }
                </div>
            </div>
        </div>
    </section>
  )
}
