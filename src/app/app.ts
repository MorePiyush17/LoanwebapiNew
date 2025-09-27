import { Component,inject} from '@angular/core';
import { RouterModule, RouterOutlet,Router } from '@angular/router';
import { AuthService } from './auth/authservice';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  title = 'Loan Management';
  auth = inject(AuthService);
  router = inject(Router);

  get isLoggedIn(): boolean {
    return this.auth.isLoggedIn();
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
