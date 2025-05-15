import nodemailer, { Transporter } from "nodemailer";

export interface SendMailOptions {
    to: string | string[];
    subject: string;
    htmlBody: string;
    attachments?: Attachment[];
}

export interface Attachment {
    filename: string;
    path: string;
}


export class MailerAdapter {
    private transporter: Transporter;

    constructor(mailerServices: string, mailerEmail: string, mailerSecret: string) {
        this.transporter = nodemailer.createTransport({
            service: mailerServices,
            auth: {
                user: mailerEmail,
                pass: mailerSecret
            }
        })
    }

    async sendMail(sendMailOptions: SendMailOptions): Promise<boolean> {
        const { to, subject, htmlBody, attachments = [] } = sendMailOptions;
        try {
            const sentInfo = await this.transporter.sendMail({
                to,
                subject,
                html: htmlBody,
                attachments,
            });

            console.log("Message sent: %s", sentInfo);

            return true
        } catch (error) {
            console.log(error);
            return false
        }
    }
}