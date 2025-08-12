import userModel from "@/model/User";
import connectDb from "@/lib/dbCongig";
import { z } from 'zod'
import { usernameValidation } from "@/schemas/signUp"

const userQuerySchema = z.object({
    username: usernameValidation
})

export async function GET(request: Request) {
    await connectDb()
    try {
        const { searchParams } = new URL(request.url)
        const queryParam = searchParams.get('username')
        const result = userQuerySchema.safeParse({ username: queryParam })
        console.log(result)

        if (!result.success) {
            const error = result.error.format().username?._errors || [];
            return Response.json({ success: false, message: error }, { status: 400 })
        }

        const { username } = result.data
        const existingUser = await userModel.findOne({ username, isVarified: true })

        if (existingUser) {
            return Response.json({ success: false, message: "username already taken" }, { status: 400 })
        }

        return Response.json({ success: true, message: "username is available" }, { status: 201 })
    } catch (error) {
        console.log("error checking in username : ", error);
        return Response.json({ success: false, message: "error checking in username" }, { status: 500 })
    }
}