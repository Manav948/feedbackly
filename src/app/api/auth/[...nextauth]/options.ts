import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import userModel from "@/model/User";
import connectDb from "@/lib/dbCongig";
import bcrypt from 'bcryptjs'

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                identifier: { label: "Email Or Username", type: "text" },
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
                        return null;
                    }
                    if (!user.isVarified) {
                        throw new Error('Please verify your account first');
                    }

                    const isPassword = await bcrypt.compare(credentials.password, user.password)
                    if (isPassword) {
                        return {
                            _id: (user._id as string).toString(),
                            email: user.email,
                            username: user.username,
                            isVarified: user.isVarified,
                            isAccpect: (user as any).isAccpect,
                        }

                    } else {
                        console.log("Incorrect password");
                        return null;
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
                token._id = (user as any)._id?.toString();
                token.isVarified = (user as any).isVarified;
                token.isAccpect = (user as any).isAccpect;
                token.username = (user as any).username;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                (session.user as any)._id = token._id;
                (session.user as any).isVarified = token.isVarified;
                (session.user as any).isAccpect = token.isAccpect;
                (session.user as any).username = token.username;
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