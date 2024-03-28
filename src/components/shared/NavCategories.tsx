import { getCategories } from "@/app/actions/categories";
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import Link from "next/link";
import { ICategory } from "@/types";



export const NavCategories = ({ id, name }: ICategory) => {

    return(
     <NavigationMenuItem>
        <Link href="" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            {name.toUpperCase()}
            </NavigationMenuLink>
        </Link>
        </NavigationMenuItem>  
        
    )
   
}

