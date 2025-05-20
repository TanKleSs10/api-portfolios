import { verificationEmailTemplate } from "./templates/verificationEmailTemplate";

export class MailTemplateManager {
    verificationEmail(name: string, link: string) {
        return verificationEmailTemplate({name, link});
    }
}