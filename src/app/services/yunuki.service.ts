import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Breed } from '../interfaces/breed.interface';
import { Yunuki } from '../interfaces/yunuki.interface';

@Injectable({
  providedIn: 'root'
})
export class YunukiService {

  private readonly apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient, private authService: AuthService) { }

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
  }

  getBreeds(): Observable<Breed[]> {
    return this.http.get<Breed[]>(`${this.apiUrl}/breed/get`, {
      headers: this.getHeaders()
    });
  }

  createYunuki(name: string, breed: number): Observable<Yunuki> {
    return this.http.post<Yunuki>(`${this.apiUrl}/yunukis/create`, { name, breed }, {
      headers: this.getHeaders()
    });
  }

  getAliveYunuki(): Observable<Yunuki> {
    return this.http.get<Yunuki>(`${this.apiUrl}/yunukis/get`, {
      headers: this.getHeaders()
    });
  }

  getDeadYunukis(): Observable<Yunuki[]> {
    return this.http.get<Yunuki[]>(`${this.apiUrl}/yunukis/get-dead`, {
      headers: this.getHeaders()
    });
  }

  feedYunuki(): Observable<Yunuki> {
    return this.http.put<Yunuki>(`${this.apiUrl}/yunukis/feed`, {}, {
      headers: this.getHeaders()
    });
  }

  cleanYunuki(): Observable<Yunuki> {
    return this.http.put<Yunuki>(`${this.apiUrl}/yunukis/clean`, {}, {
      headers: this.getHeaders()
    });
  }

  sleepYunuki(): Observable<Yunuki> {
    return this.http.put<Yunuki>(`${this.apiUrl}/yunukis/sleep`, {}, {
      headers: this.getHeaders()
    });
  }

}
