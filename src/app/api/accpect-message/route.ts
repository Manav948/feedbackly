import userModel from "@/model/User";
import connectDb from "@/lib/dbCongig";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { User } from "next-auth";
import { getServerSession } from "next-auth";

export async function POST(request: Request) {
    await connectDb()
    const session = await getServerSession(authOptions)
    const user: User = session?.user as User
    if (!session || !session.user) {
        return Response.json({ success: false, message: "Not Authenticated" }, { status: 401 })
    }
    const userId = user._id;
    const { accpectMessages } = await request.json()
    try {
        const updatedUser = await userModel.findByIdAndUpdate(userId, { isActive: accpectMessages }, { new: true })
        if (!updatedUser) {
            return Response.json({ success: false, message: "failed to update a user status to accpect message" }, { status: 404 })
        }
        return Response.json({ success: true, message: "status updated successfully " }, { status: 200 })
    } catch (error) {
        console.log("Error in POST messages function : ", error)
        return Response.json({ success: false, message: "failed to update a user status to accpect message" }, { status: 500 })
    }
}

export async function GET(request: Request) {
    await connectDb()
    const session = await getServerSession(authOptions)
    const user: User = session?.user as User
    if (!session || !session.user) {
        return Response.json({ success: false, message: "Not Authenticated" }, { status: 401 })
    }
    const userId = user._id;
    try {
        const foundUser = await userModel.findById(userId).select("isActive");
        if (!foundUser) {
            return Response.json({ success: false, message: "User not found" }, { status: 404 })
        }
        return Response.json({ success: true, isActive: foundUser.isActive }, { status: 200 })
    } catch (error) {
        console.log("Error in getMessage function : ", error);
        return Response.json({ success: false, message: "failed to get a user accpect messages" }, { status: 500 })
    }
}