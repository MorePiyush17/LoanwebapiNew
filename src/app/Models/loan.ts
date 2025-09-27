export interface Loan {
  id: string;
  status: 'ACTIVE' | 'CLOSED' | 'DEFAULTED'; // Add more statuses as needed
  balance: number;
  nextPaymentDate: string; // Format: 'MM/DD/YYYY' or ISO string
  monthlyPayment: number;
  progress: number; // Percentage from 0 to 100
}