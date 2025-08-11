import userModel from "@/model/User";
import connectDb from "@/lib/dbCongig";
import { Message } from "@/model/User";

export async function POST(request: Request) {
    await connectDb()
    const { username, content } = await request.json();
    try {
        const user = await userModel.findOne({ username })
        if (!user) {
            return Response.json({ success: false, message: "User not found" }, { status: 403 })
        }
        if (!user.isActive) {
            return Response.json({ success: false, message: "user not accpecting message" }, { status: 403 })
        }
        const newMessage = { content, createdAt: new Date() }
        user.message.push(newMessage as Message)
        await user.save()
        return Response.json({ success: true, message: "message send successfully" }, { status: 200 })
    } catch (error) {
        console.log("Error in send message : ", error)
        return Response.json({ success: false, message: "Internal server error " }, { status: 500 })
    }
}