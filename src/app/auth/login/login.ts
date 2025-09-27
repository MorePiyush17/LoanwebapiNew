import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../authservice'; // Assuming this is your AuthService

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  fb = inject(FormBuilder);
  router = inject(Router);
  authService = inject(AuthService);

  errorMessage = '';
  loading = false;

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  onSubmit() {
    this.errorMessage = '';
    if (this.loginForm.invalid) {
      this.errorMessage = 'Please enter a valid email and password.';
      return;
    }
    
    this.loading = true;

    // --- FIX IS HERE ---
    // The previous code was missing the actual login and redirect logic.
    // Now, it attempts to log in using the AuthService.
    const { email, password } = this.loginForm.value;

    if (email && password) {
      this.authService.login(email, password).subscribe({
        next: (response) => {
          // Assuming a successful response from the dummy service
          console.log('Login successful!', response);
          this.loading = false;
          // Redirect the user to the dashboard after a successful login
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          // Handle login failure
          this.loading = false;
          this.errorMessage = 'Invalid email or password.';
          console.error('Login failed:', error);
        }
      });
    } else {
      this.loading = false;
      this.errorMessage = 'Please enter an email and password.';
    }
  }
}