import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Party } from '../models/party';

const baseUrl = 'http://localhost:8080/party';

@Injectable({
  providedIn: 'root'
})
export class PartyService {

  constructor(private http: HttpClient) { }

  getAll(params: any): Observable<Party[]> {
    return this.http.get<Party[]>(`${baseUrl}/all`, { params });
  }

  get(id: any): Observable<Party> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }
/* Was on id update
  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }
*/
  update(data: any): Observable<any> {
    return this.http.put(`${baseUrl}`, data);
  }

  delete(id: number): Observable<Party> {
    return this.http.delete(`${baseUrl}/${id}`);
  }
/*
  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }
*/
  findByFirstname(firstname: any): Observable<Party[]> {
    return this.http.get<Party[]>(`${baseUrl}/firstname/?firstname=${firstname}`);
  }

  findBySurname(surname: any): Observable<Party[]> {
    return this.http.get<Party[]>(`${baseUrl}/surname/?surname=${surname}`);
  }
  
  findByOrgname(orgname: any): Observable<Party[]> {
    return this.http.get<Party[]>(`${baseUrl}/orgname/?orgname=${orgname}`);
  }
  findById(id: any): Observable<Party[]> {
    return this.http.get<Party[]>(`${baseUrl}/${id}`);
  }
}
