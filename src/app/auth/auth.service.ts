import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, tap, throwError } from 'rxjs';


export interface LoginResponse {
  access_token: string;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private readonly apiUrl = 'http://localhost:3000/auth';

  constructor(private http: HttpClient, private router: Router) { }

  login(username: string, password: string) {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, { username, password }).pipe(tap(res => {
      localStorage.setItem('access_token', res.access_token);
    }),
      catchError(error => {
        let message = 'Error de conexión';
        if (error.status === 401) {
          message = 'Credenciales incorrectas';
        }
        return throwError(() => new Error(message));
      }))
  }

  logout(): void {
    localStorage.removeItem('access_token');
    this.router.navigate(['/auth/login']);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token');
    return !!token;
  }
}
