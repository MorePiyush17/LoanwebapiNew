export interface LoanScheme {
  schemeId: number;
  schemeName: string;
  interestRate: number;
  maxAmount: number;
  durationsInMonths: number;
  description: string;
}