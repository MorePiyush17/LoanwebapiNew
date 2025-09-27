import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'https://localhost:7020/api/Auth';
  private platformId = inject(PLATFORM_ID);

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    // TEMPORARILY BYPASSING AUTHENTICATION FOR DEBUGGING
    // This will always simulate a successful login
    return of({ success: true, token: 'dummy-token-for-debug' });
    
    // ORIGINAL CODE (commented out)
    // return this.http.post<any>(`${this.apiUrl}/login`, { email, password }).pipe(
    //   tap(response => {
    //     if (isPlatformBrowser(this.platformId) && response && response.token) {
    //       localStorage.setItem('token', response.token);
    //     }
    //   })
    // );
  }
  isLoggedIn(): boolean {
    // TEMPORARILY BYPASSING AUTHENTICATION FOR DEBUGGING
    // This will always return true, so the navbar links appear
    return true;

    // ORIGINAL CODE (commented out)
    // if (isPlatformBrowser(this.platformId)) {
    //   return !!localStorage.getItem('token');
    // }
    // return false;
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
    }
  }
}