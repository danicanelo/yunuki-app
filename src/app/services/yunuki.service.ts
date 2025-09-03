import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Breed } from '../interfaces/breed.interface';
import { Yunuki } from '../interfaces/yunuki.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class YunukiService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
  }

  getBreeds(): Observable<Breed[]> {
    return this.http.get<Breed[]>(`${environment.apiUrl}/breed/get`, {
      headers: this.getHeaders()
    });
  }

  createYunuki(name: string, breed: number): Observable<Yunuki> {
    return this.http.post<Yunuki>(`${environment.apiUrl}/yunukis/create`, { name, breed }, {
      headers: this.getHeaders()
    });
  }

  getAliveYunuki(): Observable<Yunuki> {
    return this.http.get<Yunuki>(`${environment.apiUrl}/yunukis/get`, {
      headers: this.getHeaders()
    });
  }

  getDeadYunukis(): Observable<Yunuki[]> {
    return this.http.get<Yunuki[]>(`${environment.apiUrl}/yunukis/get-dead`, {
      headers: this.getHeaders()
    });
  }

  feedYunuki(): Observable<Yunuki> {
    return this.http.put<Yunuki>(`${environment.apiUrl}/yunukis/feed`, {}, {
      headers: this.getHeaders()
    });
  }

  cleanYunuki(): Observable<Yunuki> {
    return this.http.put<Yunuki>(`${environment.apiUrl}/yunukis/clean`, {}, {
      headers: this.getHeaders()
    });
  }

  sleepYunuki(): Observable<Yunuki> {
    return this.http.put<Yunuki>(`${environment.apiUrl}/yunukis/sleep`, {}, {
      headers: this.getHeaders()
    });
  }

}
