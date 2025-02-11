"use server";

import db from '@/db';
import { Resend } from 'resend';
import { sendEmail } from '@/lib/emails';
import VerifyEmail from '@/templates/verify-email';

const resend = new Resend("re_ATQDXBoj_FKcrzn1BjU6deqXR7EZhttGH");
const fromEmail = "onboarding@resend.dev";

export const signIn = async (email: string) => {
    try {
        console.log("Sign in invoked! with : ", email);
        let user = await db.user.findFirst({ where: { email } });
        if (!user) {
            return { error: true, message: "User doesn't exists with this email" };
        }
        let token = await db.verificationTokens.findFirst({ where: { user } });
        if (token) {
            await db.verificationTokens.delete({ where: { token: token.token } });
        }
        token = await db.verificationTokens.create({
            data: {
                userId: user.id,
                expiresAt: new Date(Date.now() + (10 * 60))
            }
        });
        await db.user.update({ where: { id: user.id }, data: { token: token as any } });
        console.log("Token created!");
        console.log("Sending email...");
        const response = await sendEmail(email, "Verify your account", VerifyEmail(email, token.token));
        if (response.error) {
            console.log(response.error);
            return { error: true, message: "Something went wrong." };
        }
        console.log("Email sent");
        return { error: false, message: "Email sent successfully!" };
    } catch (error: any) {
        console.log(error.stack);
        return { error: true, message: "Something went wrong!" };
    }

}

