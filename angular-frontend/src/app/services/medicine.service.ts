import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Medicine } from '../classes/medicine';

const baseUrl = 'http://localhost:8080/api/medicines';

@Injectable({
  providedIn: 'root'
})
export class MedicineService {

  private subject = new Subject<any>();

  constructor(private http: HttpClient) {
  }

  sendListUpdateAlert(medicineMessage: string) {
    this.subject.next({ text: medicineMessage });
  }

  getListUpdateAlert(): Observable<any> {
    return this.subject.asObservable();
  }

  getAllMedicine(): Observable<Medicine[]> {
    return this.http.get<Medicine[]>(baseUrl);
  }

  getMedicine(id: any): Observable<any> {
    return this.http.get(`${ baseUrl }/${ id }`);
  }

  createMedicine(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  updateMedicine(id: any, data: any): Observable<any> {
    return this.http.put(`${ baseUrl }/${ id }`, data);
  }

  deleteMedicine(id: any): Observable<any> {
    return this.http.delete(`${ baseUrl }/${ id }`);
  }

}
