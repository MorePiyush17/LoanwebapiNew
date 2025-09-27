import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { LoanOfficer } from '../../Models/loan-officer';
// import { LoanAdminService } from '../loan-admin.service'; // We'll assume a service for API calls

@Component({
  selector: 'app-loan-officer',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './loan-officer.html',
  styleUrls: ['./loan-officer.css']
})
export class LoanOfficerComponent implements OnInit {
  fb = inject(FormBuilder);
  // adminService = inject(LoanAdminService);

  officers: LoanOfficer[] = [];
  selectedOfficer: LoanOfficer | null = null;
  formMode: 'add' | 'update' = 'add';
  
  officerForm = this.fb.group({
    loanOfficerId: [0],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    contactNumber: ['', [Validators.required, Validators.pattern('^[6-9]\\d{9}$')]],
    city: ['', Validators.required]
  });

  ngOnInit(): void {
    this.fetchOfficers();
  }

  fetchOfficers(): void {
    // Dummy data for now
    this.officers = [
      { loanOfficerId: 1, firstName: 'Aman', lastName: 'Kumar', email: 'aman@example.com', contactNumber: '9876543210', city: 'Delhi' },
      { loanOfficerId: 2, firstName: 'Priya', lastName: 'Sharma', email: 'priya@example.com', contactNumber: '9988776655', city: 'Mumbai' }
    ];
  }

  onSelectOfficer(officer: LoanOfficer): void {
    this.selectedOfficer = { ...officer };
    this.officerForm.patchValue(this.selectedOfficer);
    this.formMode = 'update';
  }

  onFormSubmit(): void {
    if (this.officerForm.valid) {
      if (this.formMode === 'add') {
        console.log('Adding new officer:', this.officerForm.value);
        // API call to add a new officer
      } else {
        console.log('Updating officer:', this.officerForm.value);
        // API call to update an existing officer
      }
      this.resetForm();
      this.fetchOfficers(); // Refresh the list
    }
  }

  onDeleteOfficer(officerId: number): void {
    console.log('Deleting officer with ID:', officerId);
    // API call to delete officer
    this.fetchOfficers(); // Refresh the list
  }
  
  resetForm(): void {
    this.officerForm.reset({
      loanOfficerId: 0,
      firstName: '',
      lastName: '',
      email: '',
      contactNumber: '',
      city: ''
    });
    this.selectedOfficer = null;
    this.formMode = 'add';
  }
}