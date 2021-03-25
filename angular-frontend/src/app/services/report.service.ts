import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Report } from '../classes/report';

const baseUrl = 'http://localhost:8080/api/reports';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private allergies: string[] = [
    'Nuts',
    'Pollen',
    'Dust mites',
    'Mold'
  ];

  private disabilities: string[] = [
    'Arthritis',
    'Deaf',
    'Blind',
    'Mute',
    'Cerebral palsy',
    'Spinal cord injury',
    'Muscular dystrophy'
  ];

  // private medicines: string[] = [
  //   'Lisinopril',
  //   'Napa',
  //   'Ace',
  //   'Atorvastatin',
  //   'Levothyroxine',
  //   'Metformin',
  //   'Amlodipine',
  //   'Metoprolol',
  //   'Omeprazole',
  //   'Losartan',
  //   'Albuterol'
  // ];

  private diets: string[] = [
    'Keto',
    'Low Fat',
    'Vegetarian',
    'Carnivore',
  ];

  private reportSubject = new Subject<any>();

  constructor(private http: HttpClient) {
  }

  // Alert System
  sendListUpdateAlert(reportMessage: string) {
    this.reportSubject.next({ text: reportMessage });
  }

  getListUpdateAlert(): Observable<any> {
    return this.reportSubject.asObservable();
  }

  getAllergies() {
    return this.allergies.slice();
  }

  getDisabilities() {
    return this.disabilities.slice();
  }

  // getMedicines() {
  //   return this.medicines.slice();
  // }

  getDiets() {
    return this.diets.slice();
  }

  getAll(): Observable<Report[]> {
    return this.http.get<Report[]>(baseUrl);
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

  findReportByPatientId(patientId: any): Observable<Report[]> {
    return this.http.get<Report[]>(`${ baseUrl }/patient/${ patientId }`);
  }

  findReportByNameDob(namedob: any): Observable<any> {
    return this.http.post(`${ baseUrl }/namedob`, namedob);
  }

}
