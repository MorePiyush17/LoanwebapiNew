import { User } from "./user";

export interface LoanAdmin {
  adminId: number;
  userId: number;
  user?: User;
  reports: Report[];
}
