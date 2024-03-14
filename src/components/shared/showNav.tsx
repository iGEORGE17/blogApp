"use client"

import { usePathname } from "next/navigation";
import { Header } from "./Header";




const ShowNav = () => {
    const path = usePathname();
  return (
    <>
    {path == "/dashboard" || path == "/dashboard/posts/new" ? <></> : <Header />}

    </>
  )
}

export default ShowNav