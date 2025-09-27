// app.routes.ts
import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { Register } from './auth/register/register';
import { Dashboard } from './dashboard/dashboard/dashboard';
import { Loanscheme } from './loan-scheme/loan-scheme';
import { LoanAdminComponent } from './LoanAdmin/loan-admin/loan-admin';
import { LoanOfficerComponent } from './LoanOfficer/loan-officer/loan-officer';
// Remove this import - LoanAdmin is a model, not a component
// import { LoanAdmin } from './Models/loan-admin';

export const routes: Routes = [
  // Public routes
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  
  // Protected routes - these should be role-based in a real app
  { path: 'dashboard', component: Dashboard },
  { path: 'loan-scheme', component: Loanscheme }, // Fixed path to match navbar
  { path: 'loan-admin', component: LoanAdminComponent },
  { path: 'loan-officer', component: LoanOfficerComponent }, // Fixed path to match navbar

  // Admin parent route (if you want nested routing later)
  {
    path: 'admin',
    component: LoanAdminComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'loan-schemes', component: Loanscheme },
      { path: 'loan-officers', component: LoanOfficerComponent },
      
    ],
  },

  // Wildcard route - should be last
  { path: '**', redirectTo: 'login' }
];