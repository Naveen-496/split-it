import { JSX } from 'react';
import { Resend } from 'resend';

const resend = new Resend("re_ATQDXBoj_FKcrzn1BjU6deqXR7EZhttGH");
const fromEmail = "onboarding@resend.dev";


export async function sendEmail(to: string, subject: string, content: JSX.Element) {
    const response = await resend.emails.send({
        from: fromEmail,
        to,
        subject,
        react: content
    });

    return response;

}