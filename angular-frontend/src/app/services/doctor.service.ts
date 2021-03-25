import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Doctor } from '../classes/doctor';

const baseUrl = 'http://localhost:8080/api/doctors';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  private subject = new Subject<any>();

  constructor(private http: HttpClient) {
  }

  sendListUpdateAlert(message: string) {
    this.subject.next({ text: message });
  }

  getListUpdateAlert(): Observable<any> {
    return this.subject.asObservable();
  }

  getAll(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(baseUrl);
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

  findByName(doctorname: any): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(`${ baseUrl }/name/${ doctorname }`);
  }

}
