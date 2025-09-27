import { Component, OnInit } from '@angular/core';
import { LoanAdminService } from '../../LoanAdmin/loan-admin.service';
import { LoanOfficerComponent } from '../../LoanOfficer/loan-officer/loan-officer';
import { Loanscheme } from '../../loan-scheme/loan-scheme';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Loan } from '../../Models/loan';
import { Application } from 'express';
import { DashboardService } from '../dashboard.service';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard implements OnInit {
  loanStatus: string = '';
  outstandingBalance: number = 0;
  nextEmiDate: string = '';
  
  // Simulated data for active loan and applications
  activeLoan: Loan | null = null;
  applications: Application[] = [];

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    // Fetch active loan and applications data from service
    this.dashboardService.getActiveLoans().subscribe((loans) => {
      this.activeLoan = loans[0]; // Assuming 1 active loan for simplicity
      this.loanStatus = this.activeLoan.status;
      this.outstandingBalance = this.activeLoan.balance;
      this.nextEmiDate = this.activeLoan.nextPaymentDate;
    });

    // this.dashboardService.getApplications().subscribe((applications) => {
      // this.applications = applications;
  }
}