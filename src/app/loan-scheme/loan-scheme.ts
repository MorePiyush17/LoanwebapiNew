import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoanScheme } from '../Models/loan-scheme';
import { LoanAdminService } from '../LoanAdmin/loan-admin.service';

@Component({
  selector: 'app-loan-scheme',
  standalone: true, // It's good practice to declare this
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './loan-scheme.html',
  styleUrls: ['./loan-scheme.css']
})
export class Loanscheme implements OnInit {
  fb = inject(FormBuilder);
  adminService = inject(LoanAdminService);

  schemes: LoanScheme[] = [];
  selectedScheme: LoanScheme | null = null;
  formMode: 'add' | 'update' = 'add';
  
  // The form group for adding/editing a loan scheme
  schemeForm = this.fb.group({
    schemeId: [0],
    schemeName: ['', Validators.required],
    interestRate: [0, [Validators.required, Validators.min(0.1)]],
    maxAmount: [0, [Validators.required, Validators.min(1)]],
    durationsInMonths: [0, [Validators.required, Validators.min(1)]],
    description: ['', Validators.required]
  });

  ngOnInit(): void {
    this.fetchSchemes();
  }

  fetchSchemes(): void {
    // Placeholder: Fetch loan schemes from the backend
    // this.adminService.getLoanSchemes().subscribe(schemes => {
    //   this.schemes = schemes;
    // });
    
    // Dummy data for now
    this.schemes = [
      { schemeId: 1, schemeName: 'Home Loan', interestRate: 8.5, maxAmount: 5000000, durationsInMonths: 240, description: 'Long-term loan for purchasing a home.' },
      { schemeId: 2, schemeName: 'Car Loan', interestRate: 9.2, maxAmount: 2000000, durationsInMonths: 60, description: 'Loan for new and used vehicles.' }
    ];
  }

  onSelectScheme(scheme: LoanScheme): void {
    this.selectedScheme = { ...scheme };
    this.schemeForm.patchValue(this.selectedScheme);
    this.formMode = 'update';
  }

  onFormSubmit(): void {
    if (this.schemeForm.valid) {
      if (this.formMode === 'add') {
        console.log('Adding new scheme:', this.schemeForm.value);
      } else {
        console.log('Updating scheme:', this.schemeForm.value);
      }
      this.resetForm();
    }
  }

  onDeleteScheme(schemeId: number): void {
    console.log('Deleting scheme with ID:', schemeId);
  }
  
  resetForm(): void {
    this.schemeForm.reset({
      schemeId: 0,
      schemeName: '',
      interestRate: 0,
      maxAmount: 0,
      durationsInMonths: 0,
      description: ''
    });
    this.selectedScheme = null;
    this.formMode = 'add';
  }
}