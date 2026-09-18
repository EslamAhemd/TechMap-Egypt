import { inject, Injectable, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly tokenKey = 'authToken';
  private readonly http = inject(HttpClient);
  private readonly loggedInState = signal(Boolean(localStorage.getItem(this.tokenKey)));
  private readonly adminState = signal(false);
  private readonly checkingState = signal(false);

  constructor() {
    this.checkUserFromBackend();
  }

  isLoggedIn(): boolean {
    return this.loggedInState();
  }

  isAdmin(): boolean {
    return this.adminState();
  }

  isChecking(): boolean {
    return this.checkingState();
  }

  getEmail(): string {
    return 'Admin';
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.loggedInState.set(false);
    this.adminState.set(false);
  }

  checkUserFromBackend(): void {
    const token = localStorage.getItem(this.tokenKey);

    if (!token) {
      this.loggedInState.set(false);
      this.adminState.set(false);
      return;
    }

    this.loggedInState.set(true);
    this.checkingState.set(true);
    const headers = new HttpHeaders({ Authorization: token });

    this.http.get<{ data: { role?: string } }>('http://localhost:5000/users/me', { headers })
      .subscribe({
        next: (response) => {
          this.adminState.set(response.data?.role === 'Admin');
          this.checkingState.set(false);
        },
        error: () => {
          localStorage.removeItem(this.tokenKey);
          this.loggedInState.set(false);
          this.adminState.set(false);
          this.checkingState.set(false);
        }
      });
  }
}
