import { serverEnv } from "../env";
import { logger } from "../logger";

export type EmailMessage = {
  to: string;
  subject: string;
  html: string;
  text?: string;
};

export interface EmailAdapter {
  send(message: EmailMessage): Promise<void>;
}

function createResendAdapter(apiKey: string): EmailAdapter {
  return {
    async send(message) {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: serverEnv.EMAIL_FROM,
          to: message.to,
          subject: message.subject,
          html: message.html,
          text: message.text,
        }),
      });
      if (!response.ok) {
        logger.error("email_send_failed", { status: response.status });
        throw new Error(`Email send failed: ${response.status}`);
      }
    },
  };
}

function createDevAdapter(): EmailAdapter {
  return {
    async send(message) {
      logger.info("email_dev_send", { to: message.to, subject: message.subject });
    },
  };
}

export function createEmailAdapter(): EmailAdapter {
  if (serverEnv.RESEND_API_KEY) {
    return createResendAdapter(serverEnv.RESEND_API_KEY);
  }
  return createDevAdapter();
}
