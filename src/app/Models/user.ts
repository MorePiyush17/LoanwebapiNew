import { Customer } from "./customer";
import { LoanAdmin } from "./loan-admin";
import { LoanOfficer } from "./loan-officer";

// Define the possible roles as a TypeScript type
export type UserRole = 'Customer' | 'LoanOfficer' | 'LoanAdmin';

export interface User {
  userId: number;
  email: string;
  password?: string; // Make password optional since we don't need it in frontend
  firstName: string;
  lastName: string;
  role: UserRole;

   customer?: Customer;
  loanOfficer?: LoanOfficer;
  loanAdmin?: LoanAdmin;
}

 
