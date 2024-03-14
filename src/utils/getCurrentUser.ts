import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";


export default async function getCurrentUser() {
    try {

        const session = await getServerSession(authOptions)

        if(!session?.user?.id) {
            return null;
        }
        return session?.user?.id
        
    } catch (error) {
        return null;
    }
}