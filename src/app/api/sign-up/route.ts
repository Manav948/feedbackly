import connectDb from "@/lib/dbCongig";
import userModel from "@/model/User";
import bcrypt from 'bcryptjs';
import { sendVerificationMail } from "../../../helper/VerificationEmail";

export async function POST(request: Request) {
    await connectDb();
    try {
        const { username, email, password } = await request.json()
        const existingUserByUsername = await userModel.findOne({
            username,
            isVarified: true
        })
        if (existingUserByUsername) {
            return Response.json({ success: false, message: "user already taken" }, { status: 400 })
        }
        const existingUserByEmail = await userModel.findOne({ email })
        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString()

        if (existingUserByEmail) {
            if (existingUserByEmail.isVarified) {
                return Response.json({ success: false, messsage: "user already exist try new email " }, { status: 400 })
            } else {
                 const hashPassword = await bcrypt.hash(password, 10);
                 existingUserByEmail.password = hashPassword
                 existingUserByEmail.verifyCode = verifyCode
                 existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000)
                 await existingUserByEmail.save()
            }

        } else {
            const hashPassword = await bcrypt.hash(password, 10);
            const expiryDate = new Date()
            expiryDate.setHours(expiryDate.getHours() + 1)

            const newUser = new userModel({
                username,
                email,
                password: hashPassword,
                verifyCode,
                verifyCodeExpiry: expiryDate,
                isVarified: false,
                isActive: true,
                message: []

            })
            await newUser.save()
        }
        const emailResponse = await sendVerificationMail(
            email,
            password,
            verifyCode
        )
        if (!emailResponse.success) {
            return Response.json({ success: false, messsage: emailResponse.message }, { status: 500 })
        }

        return Response.json({ success: true, message: "user registered successfully please verified your email" }, { status: 201 })
    } catch (error) {
        console.log("Error in handle api function : ", error);
        return Response.json({
            success: false,
            message: "Error registering user"
        }, { status: 500 })
    }
}