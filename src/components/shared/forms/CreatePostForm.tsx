"use client"
import { Input } from "../../ui/input"
import { Select, SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue } from "../../ui/select"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/components/ui/use-toast"
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Link from "next/link"
import { Textarea } from "../../ui/textarea"
import { createPost } from "@/app/actions/posts"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { getCategories } from "@/app/actions/categories"
import axios from "axios"
import { CldUploadButton, CloudinaryUploadWidgetResults, CldUploadWidget } from 'next-cloudinary';
import { LuImagePlus } from "react-icons/lu";


const FormSchema = z.object({
    title: z.string(),
    tag: z.string(),
    content: z.string(),
    categoryId: z.string(),
    authorId: z.string(),
    imageUrl: z.string(),
    publicId: z.string(),
    published: z.boolean().default(false).optional(),
    featured: z.boolean().default(false).optional(),
})



const CreatePostForm = () => {

    const {data:session} = useSession();
    const [categories, setCategories] = useState([])
    const [imageUrl, setImageUrl] = useState("")
    const [publicId, setPublicId] = useState("")

    // toast({ description: "post image uploaded successfully"})
    
    useEffect(() => {
        const fetchCategories = async () => {
            const response: any = await getCategories();
            setCategories(response);
        }

        fetchCategories();
    },[])


  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
        title: "",
        tag: "",
        content: "",
        categoryId: "",
        authorId:"",
        publicId:"",
        imageUrl: "",
        published: false,
        featured: false,
    },
  })  


    async function onSubmit(data: z.infer<typeof FormSchema>) {
        data.authorId = session?.user?.id
        data.imageUrl = imageUrl
        data.publicId = publicId
        
        await axios.post("/api/posts", data)
            .then(() => toast({description: "post created successfully 😁"}))
            .catch((error) => toast({description: "errorrr... " + error.message}))
            .finally(() => {
                form.reset();
        })
  }
  return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
            
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            {/* <FormLabel>Title</FormLabel> */}
                            <FormControl>
                                <Input placeholder="Title" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is your public display name.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                        )}
                    />

                    <div className="flex lg:justify-between lg:items-stretch lg:gap-10">
                        <FormField
                            control={form.control}
                            name="tag"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    {/* <FormLabel>Tag</FormLabel> */}
                                    <FormControl>
                                        <Input placeholder="Tag" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        This is your public display name.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />                    
                        <FormField
                            control={form.control}
                            name="categoryId"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                {/* <FormLabel>category</FormLabel> */}
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select post category to display" />
                                    </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {
                                            categories?.map((category) => <SelectItem key={category?.id} value={category?.id}>{category?.name}</SelectItem>
)
                                        }
                                   
                                    </SelectContent>
                                </Select>
                                <FormDescription>
                                    You can manage email addresses in your{" "}
                                    <Link href="/examples/forms">email settings</Link>.
                                </FormDescription>
                                <FormMessage />
                                </FormItem>
                            )}
                            />

                    </div>

                    <FormField
                        control={form.control}
                        name="content"
                        render={({ field }) => (
                            <FormItem>
                            {/* <FormLabel>Content</FormLabel> */}
                            <FormControl>
                                <Textarea
                                placeholder="Write a blog post...."
                                className="resize-none"
                                {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                You can <span>@mention</span> other users and organizations.
                            </FormDescription>
                            <FormMessage />
                            </FormItem>
                    )}
                    /> 

                    <div className="flex lg:justify-between lg:items-stretch lg:gap-10">
                        <FormField
                            control={form.control}
                            name="featured"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm w-full">
                                <div className="space-y-0.5">
                                    {/* <FormLabel>Featured Post</FormLabel> */}
                                    <FormDescription>
                                    Feature post.
                                    </FormDescription>
                                </div>
                                <FormControl>
                                    <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                </FormItem>
                            )}
                            />        
                        <FormField
                            control={form.control}
                            name="published"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm w-full">
                                <div className="space-y-0.5">
                                    {/* <FormLabel>Publish Post</FormLabel> */}
                                    <FormDescription>
                                    Make post public.
                                    </FormDescription>
                                </div>
                                <FormControl>
                                    <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                </FormItem>
                            )}
                            />
                    </div>

                    <div className="flex lg:justify-between lg:items-stretch lg:gap-10">
                        <div className="w-full">    
                            <CldUploadWidget
                                uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME}
                                options={{ folder:"blogs"}}                              
                                onSuccess={(result, { widget }) => {
                                    setImageUrl(result?.info?.secure_url);
                                    setPublicId(result?.info?.public_id);
                                    widget.close();
                                }}
                                >
                                {({ open }) => {
                                    function handleOnClick() {
                                    setImageUrl("");
                                    setPublicId("")
                                    open();
                                    }
                                    return (
                                    <Button onClick={handleOnClick} type="button">
                                       <LuImagePlus className="text-xl mr-2" /> Upload Image
                                    </Button>
                                    );
                                }}
                                </CldUploadWidget>
                            </div>
                            <div className="w-full flex lg:justify-end">
                                <Button type="submit" className="">Submit</Button>
                            </div>
                    </div>            
            
        </form>
    </Form>
  )
}

export default CreatePostForm