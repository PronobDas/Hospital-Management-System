import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Test } from '../classes/test';

const baseUrl = 'http://localhost:8080/api/tests';

@Injectable({
  providedIn: 'root'
})

// @ts-ignore
export class TestService {
  private tests: string[] = [
    'A',
    'B',
    'C',
    'D',
    'E'
  ];
  private subject = new Subject<any>();

  constructor(private http: HttpClient) {
  }

  sendListUpdateAlert(testMessage: string) {
    this.subject.next({ text: testMessage });
  }

  getListUpdateAlert(): Observable<any> {
    return this.subject.asObservable();
  }

  getAllTest(): Observable<Test[]> {
    return this.http.get<Test[]>(baseUrl);
  }

  getTest(id: any): Observable<any> {
    return this.http.get(`${ baseUrl }/${ id }`);
  }

  createTest(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  updateTest(id: any, data: any): Observable<any> {
    return this.http.put(`${ baseUrl }/${ id }`, data);
  }

  deleteTest(id: any): Observable<any> {
    return this.http.delete(`${ baseUrl }/${ id }`);
  }
}
