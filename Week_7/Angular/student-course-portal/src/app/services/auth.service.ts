import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3001/users';

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());
  private currentUserSubject = new BehaviorSubject<string>(this.getStoredUserName());

  isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();
  currentUser$: Observable<string> = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {}

  get isLoggedIn(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  get currentUser(): string {
    return this.currentUserSubject.value;
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('auth_token');
  }

  private getStoredUserName(): string {
    return localStorage.getItem('auth_user_name') || 'Milind Verma';
  }

  loginWithCredentials(email: string, password: string): Observable<{ success: boolean; message: string }> {
    return this.http.get<User[]>(`${this.apiUrl}?email=${email}&password=${password}`).pipe(
      map(users => {
        if (users && users.length > 0) {
          const user = users[0];
          localStorage.setItem('auth_token', user.token);
          localStorage.setItem('auth_user_name', user.name);
          this.isAuthenticatedSubject.next(true);
          this.currentUserSubject.next(user.name);
          return { success: true, message: `Welcome back, ${user.name}!` };
        } else {
          return { success: false, message: 'Invalid email or password.' };
        }
      }),
      catchError(err => {
        console.error('Backend Login Error:', err);
        // Fallback for offline mode
        if (email && password) {
          localStorage.setItem('auth_token', 'demo-token');
          localStorage.setItem('auth_user_name', 'Milind Verma');
          this.isAuthenticatedSubject.next(true);
          this.currentUserSubject.next('Milind Verma');
          return of({ success: true, message: 'LoggedIn (Demo Mode)' });
        }
        return of({ success: false, message: 'Server communication error.' });
      })
    );
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user_name');
    this.isAuthenticatedSubject.next(false);
    this.currentUserSubject.next('');
    console.log('[AuthService] User logged out successfully');
  }

  toggle(): void {
    if (this.isLoggedIn) {
      this.logout();
    } else {
      this.loginWithCredentials('milind.verma@cognizant.com', 'password123').subscribe();
    }
  }
}
