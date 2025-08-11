import userModel from "@/model/User";
import connectDb from "@/lib/dbCongig";

export async function POST(request: Request) {
    await connectDb()
    try {
        const { username, code } = await request.json()
        const decodedUri = decodeURIComponent(username)
        const user = await userModel.findOne({ username: decodedUri })

        if (!user) {
            return Response.json({ success: false, message: "User not found" }, { status: 500 })
        }
        const isValidCode = user.verifyCode === code
        const isCodeNotExpiry = new Date(user.verifyCodeExpiry) > new Date()
        if (isValidCode && isCodeNotExpiry) {
            user.isVarified = true
            await user.save()
            return Response.json({ success: true, message: "Account verified successfully" }, { status: 200 })
        } else if (!isCodeNotExpiry) {
            return Response.json({ success: false, message: "Verify code expire please sign up again" }, { status: 500 })
        } else {
            return Response.json({ success: false, message: "incorrect code verification" }, { status: 500 })
        }
    } catch (error) {
        console.log("error verifying user: ", error);
        return Response.json({ success: false, message: "error verifying user" }, { status: 500 })
    }
}