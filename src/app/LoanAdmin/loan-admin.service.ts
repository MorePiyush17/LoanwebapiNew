import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { LoanOfficer } from '../Models/loan-officer';
import { LoanScheme } from '../Models/loan-scheme';
@Injectable({
  providedIn: 'root'
})
export class LoanAdminService {
  private http = inject(HttpClient);

  // NOTE: Replace this with your actual backend API URL
  private apiUrl = 'https://your-api-url/api/admin'; 

  constructor() { }

  // --- LOAN SCHEME FUNCTIONS (FR1.1) ---

  getLoanSchemes(): Observable<LoanScheme[]> {
    // This is a placeholder for a real API call
    // return this.http.get<LoanScheme[]>(`${this.apiUrl}/loan-schemes`);

    // Dummy data for demonstration
    const dummySchemes: LoanScheme[] = [
      { schemeId: 1, schemeName: 'Home Loan', interestRate: 8.5, maxAmount: 5000000, durationsInMonths: 240, description: 'Long-term loan for purchasing a home.' },
      { schemeId: 2, schemeName: 'Car Loan', interestRate: 9.2, maxAmount: 2000000, durationsInMonths: 60, description: 'Loan for new and used vehicles.' }
    ];
    return of(dummySchemes);
  }

  addLoanScheme(scheme: LoanScheme): Observable<LoanScheme> {
    // return this.http.post<LoanScheme>(`${this.apiUrl}/loan-schemes`, scheme);
    console.log('API Call: Adding Loan Scheme', scheme);
    return of(scheme);
  }

  updateLoanScheme(scheme: LoanScheme): Observable<LoanScheme> {
    // return this.http.put<LoanScheme>(`${this.apiUrl}/loan-schemes/${scheme.schemeId}`, scheme);
    console.log('API Call: Updating Loan Scheme', scheme);
    return of(scheme);
  }

  deleteLoanScheme(schemeId: number): Observable<any> {
    // return this.http.delete(`${this.apiUrl}/loan-schemes/${schemeId}`);
    console.log('API Call: Deleting Loan Scheme with ID', schemeId);
    return of(null);
  }


  // --- LOAN OFFICER FUNCTIONS (FR1.2) ---

  getLoanOfficers(): Observable<LoanOfficer[]> {
    // return this.http.get<LoanOfficer[]>(`${this.apiUrl}/loan-officers`);

    const dummyOfficers: LoanOfficer[] = [
      { loanOfficerId: 1, firstName: 'Aman', lastName: 'Kumar', email: 'aman@example.com', contactNumber: '9876543210', city: 'Delhi' },
      { loanOfficerId: 2, firstName: 'Priya', lastName: 'Sharma', email: 'priya@example.com', contactNumber: '9988776655', city: 'Mumbai' }
    ];
    return of(dummyOfficers);
  }

  addLoanOfficer(officer: LoanOfficer): Observable<LoanOfficer> {
    // return this.http.post<LoanOfficer>(`${this.apiUrl}/loan-officers`, officer);
    console.log('API Call: Adding Loan Officer', officer);
    return of(officer);
  }

  updateLoanOfficer(officer: LoanOfficer): Observable<LoanOfficer> {
    // return this.http.put<LoanOfficer>(`${this.apiUrl}/loan-officers/${officer.loanOfficerId}`, officer);
    console.log('API Call: Updating Loan Officer', officer);
    return of(officer);
  }

  deleteLoanOfficer(officerId: number): Observable<any> {
    // return this.http.delete(`${this.apiUrl}/loan-officers/${officerId}`);
    console.log('API Call: Deleting Loan Officer with ID', officerId);
    return of(null);
  }

  // --- REPORT GENERATION (FR1.5) ---

  generateLoanReports(): Observable<any> {
    // This method would call your backend's report generation endpoint.
    // The response could be a link to a file, the file itself, or data to display.
    // return this.http.get(`${this.apiUrl}/reports/loans`);
    console.log('API Call: Generating loan reports...');
    return of({ message: 'Loan reports generated successfully.' });
  }
}