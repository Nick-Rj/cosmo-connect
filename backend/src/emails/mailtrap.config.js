import { MailtrapClient } from 'mailtrap';
import { getEnv } from '../utils/env.js';

const mailTrapConfigHandler = () => {
  const token = getEnv('MAILTRAP_TOKEN');
  const senderEmail = getEnv('MAILTRAP_SENDER_EMAIL');
  const senderName = getEnv('MAILTRAP_SENDER_NAME');

  if (!token || !senderEmail || !senderName) {
    throw new Error(
      'Missing required Mailtrap configuration. Please set MAILTRAP_TOKEN, MAILTRAP_SENDER_EMAIL, and MAILTRAP_SENDER_NAME'
    );
  }

  const client = new MailtrapClient({ token });
  const sender = { email: senderEmail, name: senderName };

  return { client, sender };
};

const mailTrapConfig = mailTrapConfigHandler();

export default mailTrapConfig;
