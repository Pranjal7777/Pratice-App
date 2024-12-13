import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { connectToDatabase } from '@/utils/connect.db'
import { compare } from 'bcryptjs'
import { NextAuthOptions } from "next-auth"

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null
                }

                const { db } = await connectToDatabase()
                const users = db.collection('users')

                const user = await users.findOne({ email: credentials.email })
                if (!user) {
                    return null
                }

                const isPasswordValid = await compare(credentials.password, user.password)
                if (!isPasswordValid) {
                    return null
                }
                return user
            }
        })
    ],
    pages: {
        signIn: '/login',
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token._id = user._id;
            }
            return token;
        },
        async session({ session, token }) {
            session._id = token._id;
            return session;
        }
    }
    //   secret: process.env.NEXTAUTH_SECRET,  // Ensure to define this in your .env.local
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
