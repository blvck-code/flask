export interface IMessages {
  id?: number;
  category?: string;
  read?: boolean;
  timestamp?: string;
  sender_name: string;
  sender_email: string;
  subject: string;
  message: string;
}
