import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Patient } from '../classes/patient';

const baseUrl = 'http://localhost:8080/api/patients';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private patientSubject = new Subject<any>();

  constructor(private http: HttpClient) {
  }

  // Alert System
  sendListUpdateAlert(patientMessage: string) {
    this.patientSubject.next({ text: patientMessage });
  }

  getListUpdateAlert(): Observable<any> {
    return this.patientSubject.asObservable();
  }

  // Alert System

  getAll(): Observable<Patient[]> {
    return this.http.get<Patient[]>(baseUrl);
  }

  get(id: any): Observable<any> {
    return this.http.get(`${ baseUrl }/${ id }`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${ baseUrl }/${ id }`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${ baseUrl }/${ id }`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByName(patientName: any): Observable<Patient[]> {
    return this.http.get<Patient[]>(`${ baseUrl }/name/${ patientName }`);
  }

  findByNameDob(namedob: any): Observable<any> {
    return this.http.post(`${ baseUrl }/namedob`, namedob);
  }

}
