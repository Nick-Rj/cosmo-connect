import { getEnv } from "../utils/env.js";
import { createWelcomeEmailTemplate } from "./emailTemplates.js";
import mailTrapConfig from "./mailtrap.config.js";

export const sendWelcomeEmail = async (name, email, clientURL) => {

    const recipients = [{email}];

    try {
        const response = await mailTrapConfig.client.send({
            from: mailTrapConfig.sender,
            to: recipients,
            subject: "Welcome to Cosmo Connect!",
            html: createWelcomeEmailTemplate(name, clientURL, getEnv("APP_NAME")),
        });
        console.log("Welcome email sent successfully! Message IDs:", response.message_ids);
        
    } catch (error) {
        console.error("Error sending welcome email:", error);
        throw error;
    }
}
