import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckinService {
  private baseUrl = 'http://localhost:8080/checkin';

  constructor(private http: HttpClient) { }

  createCheckin(checkin: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, checkin);
  }

  updateCheckin(id: number, checkin: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, checkin);
  }

  deleteCheckin(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }

  getCheckinById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }
}
