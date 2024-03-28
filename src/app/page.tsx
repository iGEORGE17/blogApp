"use client"
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { getAllPosts } from "./actions/posts";
import { useEffect, useState } from "react";
import PostItem from "@/components/shared/posts/PostItem";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { IPost } from "@/types";

export default function Home() {
  const [posts, setPosts] = useState([])

    useEffect(() => {
      const fetchPosts = async() => {
        const res: any = await getAllPosts();
        console.log(res)
        setPosts(res);
      } 

      fetchPosts();
    },[])
      
  return (
    <section className="flex min-h-screen flex-col items-center">
      <div className="mx-[5%] py-[6%]">
        <h1>Posts</h1>
        <hr className="my-2" />
        <div className="grid lg:grid-cols-3 gap-3">
          {
            posts?.length <= 0 ? (
              <div>
                <h1 className="text-3xl font-bold">No Posts Currently</h1>
              </div>
            ):
            ( 
              posts?.map(({id, title, tag, content, category, author}:IPost ) => (
                  <PostItem key={id} id={id} title={title} tag={tag} content={content} category={category} author={author} />
              ))                
            )
          }
        </div>
      </div>
    </section>
  );
}
