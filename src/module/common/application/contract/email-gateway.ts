export type EmailParams = {
  to: string;
  subject: string;
  html: string;
};

export type EmailResult = {
  email: string;
  status: "success" | "failed";
  error?: string;
};

export interface EmailGateway {
  send(params: EmailParams): Promise<void>;
  sendMany(params: Array<EmailParams>): Promise<Array<EmailResult>>;
}
