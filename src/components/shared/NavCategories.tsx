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



export const NavCategories = ({ category }: any) => {

    const { id, name } = category || {}
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

