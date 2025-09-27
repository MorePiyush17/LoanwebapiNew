// navbar.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isLoggedIn = true; // You should manage this through a service
  userRole = 'admin'; // You should get this from authentication service

  constructor(private router: Router) {}

  logout(): void {
    this.isLoggedIn = false;
    // Clear user data, tokens, etc.
    this.router.navigate(['/login']);
  }

  // Helper methods to show/hide menu items based on role
  isAdmin(): boolean {
    return this.userRole === 'admin';
  }

  isLoanOfficer(): boolean {
    return this.userRole === 'officer' || this.userRole === 'admin';
  }

  isCustomer(): boolean {
    return this.userRole === 'customer';
  }
}