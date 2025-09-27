export interface Application {
  id: string;
  status: 'APPROVED' | 'UNDER REVIEW' | 'REJECTED';
  amount: number;
  purpose: string; // e.g., "Home Improvement", "Debt Consolidation"
  interestRate: number;
  monthlyPayment: number;
  submittedDate: string; // Format: 'MM/DD/YYYY'
  reviewDate?: string;   // Optional, only if reviewed
  documentsCount: number;
}