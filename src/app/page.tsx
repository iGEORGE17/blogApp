"use client"
import DataComponent from "@/components/shared/dataComponent";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { getAllPosts } from "./actions/posts";
import { useEffect, useState } from "react";
import PostItem from "@/components/shared/posts/PostItem";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

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
                <h1>No Posts Currently</h1>
              </div>
            ):
          ( 
            posts?.map((post) => (
              <Link key={post?.id} href={`/posts/${post.id}`}>
                <PostItem post={post} />
              </Link>
            ))                
          )
          }
        </div>

      </div>
    </section>
  );
}
