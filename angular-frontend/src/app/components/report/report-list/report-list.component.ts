import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Patient } from '../../../classes/patient';
import { Report } from '../../../classes/report';
import { ReportService } from '../../../services/report.service';
import { PatientService } from '../../../services/patient.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: [ './report-list.component.css' ]
})
export class ReportListComponent implements OnInit, OnDestroy {
  patients: Observable<Patient[]>;
  patientList: Patient[];
  reports: Observable<Report[]>;
  reportByNameDob: Report = new Report();
  subscription: Subscription;


  constructor(private reportService: ReportService,
              private patientService: PatientService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.reloadData();
    this.subscription = this.reportService.getListUpdateAlert().subscribe(
      (reportMessage) => {
        if (reportMessage) {
          this.reloadData();
        }
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  reloadData() {
    // @ts-ignore
    this.patients = this.patientService.getAll().subscribe(
      (data: Patient[]) => {
        this.patientList = data;
      }
    );
    this.reports = this.reportService.getAll();
  }

  reportDetails(id: string) {
    this.router.navigate([ 'details', id ], { relativeTo: this.route });
  }

  addReport() {
    this.router.navigate([ 'add' ], { relativeTo: this.route });
  }

  // Pass name and date of birth from the form and get the patient object from patient service
  getReportByPatientNameDob(patientName: string, patientDob: string) {
    const patientNameDob = {
      name: patientName,
      dob: new Date(patientDob)
      // name: 'Naruto',
      // dob: '1995-06-15'
    };
    this.reportService.findReportByNameDob(patientNameDob).subscribe(
      (namedob: Report) => {
        this.reportByNameDob = namedob;
      }
    );
  }

  getPatientName(patientID: string) {
    try {
      return this.patientList.find(p => p.id === patientID).name;
    } catch ( error ) {
      return null;
    }
  }

  getPatientDob(patientID: string) {
    try {
      return this.patientList.find(p => p.id === patientID).dob;
    } catch ( error ) {
      return null;
    }
  }

  getPatientContact(patientID: string) {
    try {
      return this.patientList.find(p => p.id === patientID).contact;
    } catch ( error ) {
      return null;
    }
  }
}
