import { Injectable } from '@angular/core';
import { Observable, Subject} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Invoice } from '../classes/invoice';

const baseUrl = 'http://localhost:8080/api/invoices';
@Injectable({
  providedIn: 'root'
})
// @ts-ignore
export class InvoiceService {
  private tests: string[] = [
    'A',
    'B',
    'C',
    'D'
  ];
  private invoiceSubject = new Subject<any>();

  constructor(private http: HttpClient) {
  }
  sendListUpdateAlert(invoiceMessage: string) {
    this.invoiceSubject.next({ text: invoiceMessage });
  }

  getListUpdateAlert(): Observable<any> {
    return this.invoiceSubject.asObservable();
  }
  getTests(){
    return this.tests.slice();
  }
  getAll(): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(baseUrl);
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

  findInvoiceByPatientId(patientId: any): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(`${ baseUrl }/patient/${ patientId }`);
  }
}
