import userModel from "@/model/User";
import connectDb from "@/lib/dbCongig";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { User } from "next-auth";
import { getServerSession } from "next-auth";
import mongoose from "mongoose";

export async function GET() {
    await connectDb()
    const session = await getServerSession(authOptions)
    const user: User = session?.user as User
    
    if (!session || !session.user) {
        return Response.json({ success: false, message: "Not Authenticated" }, { status: 401 })
    }
    const userId = new mongoose.Types.ObjectId(user._id);
    try {
        const agg = await userModel.aggregate([
            { $match: { _id: userId } },
            { $unwind: '$message' },
            { $sort: { 'message.createdAt': -1 } },
            { $group: { _id: '$_id', messages: { $push: '$message' } } },  
            { $project: { _id: 0, messages: 1 } },
        ])
        if (!agg || agg.length === 0) {
            return Response.json({ success: true, messages: [] }, { status: 200 })
        }
        return Response.json({ success: true, messages: agg[0].messages }, { status: 200 })
    } catch (error) {
        console.log("Unexpected error : ", error)
        return Response.json({ success: false, message: "Unexpected error" }, { status: 500 })
    }
}    