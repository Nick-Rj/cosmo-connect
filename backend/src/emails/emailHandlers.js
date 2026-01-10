import { getEnv } from "../utils/env.js";
import { createWelcomeEmailTemplate } from "./emailTemplates.js";
import mailTrapConfig from "./mailTrap.config.js";

export const sendWelcomeEmail = async (name, email, clientURL) => {

    const recipients = [{email}];

    try {
        if(mailTrapConfig.error) {
            throw new Error("Mailtrap configuration error: " + mailTrapConfig.error.message);
        }
        const response = await mailTrapConfig.client.send({
            from: mailTrapConfig.sender,
            to: recipients,
            subject: "Welcome to Cosmo Connect!",
            html: createWelcomeEmailTemplate(name, clientURL, getEnv("APP_NAME")),
        })
        if(response.error) {
            throw new Error("Failed to send the Welcome Email: " + response.error.message);
        }
        console.log("Welcome email sent successfully!", response);
        
    } catch (error) {
        console.error("Error sending welcome email:", error);
        throw error;
    }
}
