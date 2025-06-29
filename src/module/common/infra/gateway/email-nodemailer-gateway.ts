import nodemailer from "nodemailer";
import { EmailGateway, EmailParams, EmailResult } from "../../application";
import SMTPTransport from "nodemailer/lib/smtp-transport";

export class EmailNodemailerGateway implements EmailGateway {
  private mailTransporter: nodemailer.Transporter<
    SMTPTransport.SentMessageInfo,
    SMTPTransport.Options
  >;

  constructor() {
    this.mailTransporter = nodemailer.createTransport({
      host: "smtp.mailtrap.io", // ou smtp.gmail.com, dependendo do serviço
      port: 587,
      auth: {
        user: "seu-usuario-mailtrap",
        pass: "sua-senha-mailtrap",
      },
    });
  }

  async send({ html, subject, to }: EmailParams): Promise<void> {
    const info = await this.mailTransporter.sendMail({
      from: '"Memus App" <no-reply@memus.com>',
      to,
      subject,
      html,
    });
  }

  async sendMany(params: Array<EmailParams>): Promise<EmailResult[]> {
    const results = await Promise.allSettled(
      params.map((item) =>
        this.send(item)
          .then(() => ({ email: item.to, status: "success" as const }))
          .catch((err) => ({
            email: item.to,
            status: "failed" as const,
            error: err.message,
          }))
      )
    );
    return results.map((result) =>
      result.status === "fulfilled"
        ? result.value
        : {
            email: "unknown", // fallback, mas nunca deve acontecer aqui
            status: "failed",
            error: "Unexpected error",
          }
    );
  }
}
