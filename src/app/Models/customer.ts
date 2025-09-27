import { User } from "./user";

export interface Customer {
  customerId: number;
  userId: number;
  city: string;
  contactNumber: string;
  user?: User;
}