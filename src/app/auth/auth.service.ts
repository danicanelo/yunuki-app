import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, tap, throwError } from 'rxjs';


export interface LoginResponse {
  access_token: string;
}

export interface User {
  id: number;
  username: string;
  email?: string;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private readonly apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient, private router: Router) { }

  getUser(): Observable<User> {
    const token = localStorage.getItem('access_token');
    if (!token) {
      return throwError(() => new Error('No token found'));
    }
    return this.http.get<User>(`${this.apiUrl}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).pipe(
      catchError(error => {
        if (error.status === 401) {
          this.logout();
          return throwError(() => new Error('No autorizado'));
        }
        return throwError(() => new Error('Error al obtener el usuario'));
      })
    )
  }

  login(username: string, password: string) {
    return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, { username, password }).pipe(tap(res => {
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

  register(username: string, email: string, password: string) {
    return this.http.post(`${this.apiUrl}/users/register`, { username, email, password }).pipe(
      tap(() => {
        this.router.navigate(['/auth/login']);
      }),
      catchError(error => {
        let message = '';
        if (error.status === 409) {
          message = error.error.message || 'Error desconocido';
          return throwError(() => new Error(message));
        } else if (error.status === 400) {
          if (Array.isArray(error.error.message)) {
            const errors = error.error.message;
            const fieldErrors: any = {};
            errors.forEach((err: string) => {
              if (err.includes('correo')) {
                fieldErrors.email = err;
              }
              if (err.includes('contraseña')) {
                fieldErrors.password = err;
              }
            });
            return throwError(() => fieldErrors);
          }
        }
        return throwError(() => new Error(message));
      })
    );
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
