import CreatePostForm from "@/components/shared/forms/CreatePostForm";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";


export default function NewPost() {
  return (
    <section>
        <div className="p-[3%] lg:flex lg:flex-col gap-3">
            <Alert>
                {/* <Terminal className="h-4 w-4" /> */}
                <AlertTitle>Compose New Post</AlertTitle>
                <AlertDescription>
                    You can compose a new post here...
                </AlertDescription>
            </Alert>
            <div className="">
                <CreatePostForm />
            </div>
        </div>
    </section>
  )
}

