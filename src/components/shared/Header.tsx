"use client"
import Link from "next/link"


import { signIn, signOut, useSession } from "next-auth/react"

import { NavCategories } from "./NavCategories"
import { useEffect, useState } from "react"
import { getCategories } from "@/app/actions/categories"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import Image from "next/image"

export function Header() {

  const { status, data: session } = useSession()
  const [categories, setCategories] = useState([])

  useEffect(() => {

    const FetchNavCat = async () => {
        const res: any = await getCategories();
        setCategories(res)
    }

    FetchNavCat();
  },[])

   
  return (
    <header className="fixed top-0 w-full bg-slate-100 z-30">
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                </div>
                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                    <li><a>Item 1</a></li>
                    <li>
                    <a>Parent</a>
                    <ul className="p-2">
                        <li><a>Submenu 1</a></li>
                        <li><a>Submenu 2</a></li>
                    </ul>
                    </li>
                    <li><a>Item 3</a></li>
                </ul>
                </div>
                <a href="/" className="btn btn-ghost text-xl">BlogApp</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <NavigationMenu>
                    <NavigationMenuList>                        
                            {
                                categories?.map((category) => (
                                    <NavCategories key={category?.id} category={category} />
                                ))
                            }       
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
            <div className="navbar-end">
                {
                    status === 'authenticated' ? 
                    (
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">                        
                                {session?.user?.name[0]}                            
                            </div>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            <li><Link href={"/dashboard"}>Dashboard</Link></li>
                            <li>
                            <a className="justify-between">
                                Profile
                                <span className="badge">New</span>
                            </a>
                            </li>
                            <li><a>Settings</a></li>
                            <li><Link href={""} onClick={() => signOut()}>Logout</Link></li>
                        </ul>
                        </div>                        
                    )
                    :
                    (
                        <>
                            <Link className="" href={""} onClick={() => signIn()}>Signin</Link>
                        </>
                    )
                }
            </div>
            </div>
    </header>
  )
}

