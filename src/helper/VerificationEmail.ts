import { resend } from '../lib/resend'
import VerificationEmail from '../../emails/SendEmailVerification'
import { ApiResponse } from '@/types/apiResponse'

export async function sendVerificationMail(
    email: string,
    username: string,
    verifyCode: string
): Promise<ApiResponse> {
    try {
        if (!process.env.RESEND_API_KEY) {
            return { success: false, message: 'Email service not configured' }
        }

        await resend.emails.send({
            from: 'Feedbackly <noreply@feedbackly.manavvalani.in>',
            to: email,
            subject: 'Verification Code',
            react: VerificationEmail({ username, otp: verifyCode }),
        })
        return { success: true, message: 'Email send successfully' }
    } catch (error) {
        console.log("error in sendVerificationMail function : ", error);
        return { success: false, message: 'failed to send email verification' }
    }
}