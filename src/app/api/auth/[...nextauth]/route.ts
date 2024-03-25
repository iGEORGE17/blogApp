import { prisma } from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { AuthOptions } from "next-auth";
import { Adapter } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";




const authOptions: AuthOptions = {
    session: {
        strategy: "jwt"
    },
    adapter: PrismaAdapter(prisma) as Adapter,
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "email", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials:any, req) {

            const user: any = await prisma.user.findUnique({
                where: {
                    email: credentials?.email
                }
            })

            if (!user) {
                throw new Error("invalid email")
            } 

            // checkpassword
            const passChk = bcrypt.compareSync(credentials?.password, user.password)

            if(!passChk) {
                throw new Error("invalid login")
            }

            return {
                id: user.id,
                name: user.name,
                email: user.email,
                image: user.image,
                role:user.role
            }

            }
        })
    ],
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {   
            return true
        },
        async redirect({ url, baseUrl }) {
            return baseUrl
        },
        async session({ session, user, token }) {
            return {
                    ...session,
                    user: {
                        ...session.user,
                        id: token.id,
                    }
                }
        },
        async jwt({ token, user, account, profile, isNewUser }) {

            if(user) {
                const u = user as unknown as User
                return {
                    ...token,
                    id: u.id,
                }
            }
            return token
        }
    },
    secret: process.env.NEXTAUTH_SECRET!
}


const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };