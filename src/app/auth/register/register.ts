import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../authservice';

// Custom validator to check if passwords match
function passwordsMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password')?.value;
  const confirmPassword = control.get('confirmPassword')?.value;
  return password === confirmPassword ? null : { passwordsMismatch: true };
}
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  fb = inject(FormBuilder);
  router = inject(Router);

  errorMessage = '';
  loading = false;
  
  // Simple regex for at least 8 characters
  passwordRegex = /.{8,}/;

  registerForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    role: ['Customer', Validators.required],
    password: ['', [Validators.required, Validators.pattern(this.passwordRegex)]],
    confirmPassword: ['', Validators.required],
    city: [''],
    contactNumber: ['']
  }, {
    validators: passwordsMatchValidator
  });

  constructor() {
    this.registerForm.get('role')?.valueChanges.subscribe(role => {
      this.toggleConditionalValidators(role);
    });
    this.toggleConditionalValidators(this.registerForm.get('role')?.value);
  }

  private toggleConditionalValidators(role: string | null | undefined): void { 
    const cityControl = this.registerForm.get('city');
    const contactControl = this.registerForm.get('contactNumber');

    if (role === 'Customer' || role === 'LoanOfficer') {
      cityControl?.setValidators(Validators.required);
    } else {
      cityControl?.clearValidators();
    }

    if (role === 'Customer') {
      contactControl?.setValidators([
        Validators.required,
        Validators.pattern('^[6-9]\\d{9}$')
      ]);
    } else {
      contactControl?.clearValidators();
    }

    cityControl?.updateValueAndValidity();
    contactControl?.updateValueAndValidity();
  }

  onSubmit() {
    this.errorMessage = '';
    if (this.registerForm.invalid) {
      console.log('Form is invalid. Please check fields.');
      this.errorMessage = 'Please fill out all required fields correctly.';
      this.registerForm.markAllAsTouched();
      return;
    }
    
    this.loading = true;
    console.log('Form is valid. Submitting data...');
    console.log(this.registerForm.value);

    setTimeout(() => {
      this.loading = false;
      this.router.navigate(['/login']);
      console.log("✅ Dummy Registration successful!");
    }, 1500);
  }
}