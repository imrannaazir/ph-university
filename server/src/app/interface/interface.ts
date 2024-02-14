export type TEmailPayload = {
  receiver: string;
  subject: string;
  text?: string;
  html: string;
};
