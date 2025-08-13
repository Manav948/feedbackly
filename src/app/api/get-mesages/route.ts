import userModel from "@/model/User";
import connectDb from "@/lib/dbCongig";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { User } from "next-auth";
import { getServerSession } from "next-auth";
import mongoose from "mongoose";

export async function GET(request: Request) {
    await connectDb()
    const session = await getServerSession(authOptions)
    const user: User = session?.user as User
    if (!session || !session.user) {
        return Response.json({ success: false, message: "Not Authenticated" }, { status: 401 })
    }
    const userId = new mongoose.Types.ObjectId(user._id);
    try {
        const user = await userModel.aggregate([
            { $match: userId },
            { $unwind: 'messages' },
            { $sort: { 'messages.createdAt': -1 } },
            { $group: { _id: '$_id', messages: { $push: '$messages' } } }
        ])
        if (!user || user.length === 0) {
            return Response.json({ success: false, message: "user not found" }, { status: 404 })
        }
        return Response.json({ success: true, messages: user[0].messages }, { status: 401 })
    } catch (error) {
        console.log("Unexpected error : ", error)
        return Response.json({ success: false, message: "Unexpected error" }, { status: 401 })
    }
}    