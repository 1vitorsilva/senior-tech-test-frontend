import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HospedesService {
  private baseUrl = 'http://localhost:8080/hospede';

  constructor(private http: HttpClient) { }

  createHospede(hospede: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, hospede);
  }

  updateHospede(id: number, hospede: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, hospede);
  }

  deleteHospede(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }

  getHospedeById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  getAllHospedes(situacao: string, page: number, size: number): Observable<any> {
    return this.http.get<any>(this.baseUrl, { params: { situacao, page, size } })
  }

  getHospedeByAny(param: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/search`, { params: { param } })
  }
}
