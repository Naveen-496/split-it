

"use server";

import db from '@/db';
import { Resend } from 'resend';
import { sendEmail } from '@/lib/emails';
import VerifyEmail from '@/templates/verify-email';

const resend = new Resend("re_ATQDXBoj_FKcrzn1BjU6deqXR7EZhttGH");
const fromEmail = "onboarding@resend.dev";

export const signUp = async (email: string, username: string) => {
    try {
        console.log("Sign up invoked! with : ", { email, username });
        let user = await db.user.findFirst({ where: { email } });
        console.log("User: ", user);
        if (user) {
            return { error: true, message: "User already exists with this email" };
        }
        user = await db.user.create({ data: { email, username, lastLoggedIn: new Date() } })
        console.log("User created: ", user);
        let token = await db.verificationTokens.findFirst({ where: { userId: user.id } });
        console.log("Token: ", token);
        if (token) {
            await db.verificationTokens.delete({ where: { token: token.token } });
        }
        token = await db.verificationTokens.create({
            data: {
                userId: user.id,
                expiresAt: new Date(Date.now() + (10 * 60))
            }
        });
        console.log("Token: ", token);
        // await db.user.update({ where: { id: user.id }, data: { token: token as any } });
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
    }

}

