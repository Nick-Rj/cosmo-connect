import { MailtrapClient } from "mailtrap";
import { getEnv } from "../utils/env.js";


const mailTrapConfigHandler = () => {
    const mailTrapConfig = {client: null, sender: null, error: null};
    try {
        if(!getEnv("MAILTRAP_TOKEN")) {
            throw new Error("Mailtrap token not found!");
        }

        if(!getEnv("MAILTRAP_SENDER_EMAIL")) {
            throw new Error("Mailtrap sender email not found!");
        }

        if(!getEnv("MAILTRAP_SENDER_NAME")) {
            throw new Error("Mailtrap sender name not found!");
        }
        
        const client = new MailtrapClient({
            token: getEnv("MAILTRAP_TOKEN"),
        });

        const sender = {
            email: getEnv("MAILTRAP_SENDER_EMAIL"),
            name: getEnv("MAILTRAP_SENDER_NAME"),
        };
        
        mailTrapConfig.client = client;
        mailTrapConfig.sender = sender;
        return mailTrapConfig;
    } catch (error) {
        console.error("Error configuring Mailtrap:", error);
        mailTrapConfig.error = error;
        return mailTrapConfig;
    }
}

const mailTrapConfig = mailTrapConfigHandler();

export default mailTrapConfig;