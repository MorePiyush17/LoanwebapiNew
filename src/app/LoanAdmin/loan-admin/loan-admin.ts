// src/app/LoanAdmin/loan-admin/loan-admin.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoanAdmin}from '../../Models/loan-admin';

import { LoanScheme } from '../../Models/loan-scheme';

import { DashboardStats } from '../../Models/Dashboardstatus';
import { Report } from '../../Models/report';

@Component({
  selector: 'app-loan-admin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './loan-admin.component.html',
  styleUrls: ['./loan-admin.component.css']
})
export class LoanAdminComponent implements OnInit {
  
  // Current admin data
  currentAdmin: LoanAdmin = {
    adminId: 1,
    userId: 101,
    user: {
      userId: 101,
      email: 'admin@loanmanagement.com',
      firstName: 'Admin',
      lastName: 'User',
      role: "LoanAdmin"
    },
    reports: []
  };

  // Dashboard statistics
  dashboardStats: DashboardStats = {
    totalCustomers: 1247,
    totalLoans: 856,
    totalAmount: 45678900,
    activeSchemes: 8
  };

  // Data arrays
  reports: Report[] = [];
  loanSchemes: LoanScheme[] = [];
  
  // UI State
  activeTab = 'dashboard';
  loading = false;
  showReportModal = false;
  showSchemeModal = false;

  // Forms
  reportForm!: FormGroup;
  schemeForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForms();
    this.loadData();
  }

  private initializeForms(): void {
    // Report form
    this.reportForm = this.formBuilder.group({
      reportType: ['Monthly Summary', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });

    // Scheme form
    this.schemeForm = this.formBuilder.group({
      schemeName: ['', Validators.required],
      interestRate: ['', [Validators.required, Validators.min(0.1), Validators.max(50)]],
      maxAmount: ['', [Validators.required, Validators.min(1000)]],
      durationsInMonths: ['', [Validators.required, Validators.min(1), Validators.max(360)]],
      description: ['']
    });
  }

  private loadData(): void {
    // Load reports
    this.reports = [
      {
        reportId: 1,
        adminId: 1,
        reportType: 'Monthly Summary',
        startDate: new Date(2024, 8, 1),
        endDate: new Date(2024, 8, 30),
        generatedDate: new Date()
      },
      {
        reportId: 2,
        adminId: 1,
        reportType: 'Loan Performance',
        startDate: new Date(2024, 7, 1),
        endDate: new Date(2024, 7, 31),
        generatedDate: new Date(2024, 8, 1)
      }
    ];

    // Load loan schemes
    this.loanSchemes = [
      {
        schemeId: 1,
        schemeName: 'Home Loan',
        interestRate: 7.5,
        maxAmount: 5000000,
        durationsInMonths: 240,
        description: 'Affordable home loans with competitive rates'
      },
      {
        schemeId: 2,
        schemeName: 'Personal Loan',
        interestRate: 12.5,
        maxAmount: 500000,
        durationsInMonths: 60,
        description: 'Quick personal loans for immediate needs'
      },
      {
        schemeId: 3,
        schemeName: 'Car Loan',
        interestRate: 8.9,
        maxAmount: 2000000,
        durationsInMonths: 84,
        description: 'Drive your dream car with flexible loans'
      }
    ];
  }

  // Tab navigation
  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  // Report functions
  openReportModal(): void {
    this.showReportModal = true;
  }

  generateReport(): void {
    if (this.reportForm.valid) {
      this.loading = true;
      
      // Simulate API call
      setTimeout(() => {
        const newReport: Report = {
          reportId: this.reports.length + 1,
          adminId: this.currentAdmin.adminId,
          reportType: this.reportForm.value.reportType,
          startDate: new Date(this.reportForm.value.startDate),
          endDate: new Date(this.reportForm.value.endDate),
          generatedDate: new Date()
        };
        
        this.reports.unshift(newReport);
        this.loading = false;
        this.showReportModal = false;
        this.reportForm.reset();
        
        alert('Report generated successfully!');
      }, 1500);
    }
  }

  downloadReport(report: Report): void {
    alert(`Downloading ${report.reportType} report...`);
    // Implement download logic here
  }

  deleteReport(reportId: number): void {
    if (confirm('Are you sure you want to delete this report?')) {
      this.reports = this.reports.filter(r => r.reportId !== reportId);
      alert('Report deleted successfully!');
    }
  }

  // Loan scheme functions
  openSchemeModal(): void {
    this.showSchemeModal = true;
  }

  createScheme(): void {
    if (this.schemeForm.valid) {
      this.loading = true;
      
      // Simulate API call
      setTimeout(() => {
        const newScheme: LoanScheme = {
          schemeId: this.loanSchemes.length + 1,
          schemeName: this.schemeForm.value.schemeName,
          interestRate: this.schemeForm.value.interestRate,
          maxAmount: this.schemeForm.value.maxAmount,
          durationsInMonths: this.schemeForm.value.durationsInMonths,
          description: this.schemeForm.value.description
        };
        
        this.loanSchemes.push(newScheme);
        this.dashboardStats.activeSchemes++;
        this.loading = false;
        this.showSchemeModal = false;
        this.schemeForm.reset();
        
        alert('Loan scheme created successfully!');
      }, 1500);
    }
  }

  deleteScheme(schemeId: number): void {
    if (confirm('Are you sure you want to delete this loan scheme?')) {
      this.loanSchemes = this.loanSchemes.filter(s => s.schemeId !== schemeId);
      this.dashboardStats.activeSchemes--;
      alert('Loan scheme deleted successfully!');
    }
  }

  // Modal controls
  closeModal(): void {
    this.showReportModal = false;
    this.showSchemeModal = false;
  }

  // Utility functions
  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('en-IN');
  }

  // Form validation helpers
  hasError(formGroup: FormGroup, fieldName: string): boolean {
    const field = formGroup.get(fieldName);
    return !!(field?.errors && field.touched);
  }

  getErrorMessage(formGroup: FormGroup, fieldName: string): string {
    const field = formGroup.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors['required']) {
        return `${fieldName} is required`;
      }
      if (field.errors['min']) {
        return `${fieldName} must be at least ${field.errors['min'].min}`;
      }
      if (field.errors['max']) {
        return `${fieldName} must not exceed ${field.errors['max'].max}`;
      }
    }
    return '';
  }
}