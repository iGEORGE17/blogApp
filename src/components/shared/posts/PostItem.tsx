
import { Badge, BellRing, Check } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import Link from "next/link"
import { IPost } from "@/types"






const PostItem = ({ id, title, tag, content, category, author }: IPost) => {
  return (
    <Link href={`/posts/${id}`}>
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>
                    <div className="flex lg:justify-between lg:items-center">
                        <p className="">By {author?.name}</p>
                        <small className="bg-primary text-white rounded-md px-3">{category?.name}</small>                
                    </div>
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p>{content.slice(0,100)}</p>
            </CardContent>
            <CardFooter>
                <p className="text-grey-50">#{tag}</p>            
            </CardFooter>
        </Card>
    </Link>
  )
}


export default PostItem