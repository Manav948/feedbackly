import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import userModel from "@/model/User";
import connectDb from "@/lib/dbCongig";
import bcrypt from 'bcryptjs'

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: "Credentials",
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "password", type: "password" },
            },
            async authorize(credentials: any): Promise<any> {
                await connectDb();
                try {
                    const user = await userModel.findOne({
                        $or: [
                            { email: credentials.identifier },
                            { username: credentials.identifier },
                        ]
                    })
                    if (!user) {
                        console.log("user not found with this email")
                        throw new Error('No User found');
                    }
                    if (!user.isVarified) {
                        throw new Error('Please verify your account first');
                    }

                    const isPassword = await bcrypt.compare(credentials.password, user.password)
                    if (isPassword) {
                        return user;
                    } else {
                        console.log("Incorrect password");
                        throw new Error("Incorrect password please correct it")
                    }
                } catch (error: any) {
                    console.log("Error in authorizaion function : ", error);
                    throw new Error(error);
                }
            },
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token._id = user._id?.toString()
                token.isVerified = user.isVerified;
                token.isAccpect = user.isAccpect;
                token.username = user.username;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user._id = token._id
                session.user.isVerified = token.isVerified
                session.user.isAccpect = token.isAccpect
                session.user.username = token.username
            }
            return session
        }
    },
    pages: {
        signIn: '/sign-in'
    },
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET
}