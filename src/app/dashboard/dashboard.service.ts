import { Injectable } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { Loan } from '../Models/loan';
import { Application } from 'express';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor() {}

  // Mock method to get active loan data
  getActiveLoans(): Observable<Loan[]> {
    const activeLoans: Loan[] = [
      {
        id: 'an-1',
        status: 'ACTIVE',
        balance: 22500,
        nextPaymentDate: '3/1/2024',
        monthlyPayment: 489.5,
        progress: 10,
      }
    ];
    return of(activeLoans); // Returns an observable
  }

//   // Mock method to get applications
//   getApplications(): Observable<Application[]> {
//     const applications: Application[] = [
//       {
//         id: 'pp-1',
//         status: 'APPROVED',
//         amount: 25000,
//         purpose: 'Home Improvement',
//         interestRate: 6.5,
//         monthlyPayment: 489.5,
//         submittedDate: '1/15/2024',
//         reviewDate: '1/20/2024',
//         documentsCount: 2,
//       },
//       {
//         id: 'pp-2',
//         status: 'UNDER REVIEW',
//         amount: 15000,
//         purpose: 'Debt Consolidation',
//         interestRate: 7.2,
//         monthlyPayment: 350,
//         submittedDate: '2/10/2024',
//         documentsCount: 1,
//       }
//     ];
//     return of(applications); // Returns an observable
//   }
// }
}