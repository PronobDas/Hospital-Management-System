import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Patient } from '../../../classes/patient';
import { PatientService } from '../../../services/patient.service';
import { Observable } from 'rxjs';
import { Doctor } from '../../../classes/doctor';
import { DoctorService } from '../../../services/doctor.service';

@Component({
  selector: 'app-patient-add',
  templateUrl: './patient-add.component.html',
  styleUrls: [ './patient-add.component.css' ]
})
export class PatientAddComponent implements OnInit {
  patient: Patient = new Patient();
  submitted = false;
  patientID: string;
  Male = 'Male';
  Female = 'Female';
  doctors: Observable<Doctor[]>;

  constructor(private patientService: PatientService,
              private doctorService: DoctorService,
              private router: Router) {
  }

  ngOnInit() {
    this.doctors = this.doctorService.getAll();
  }

  save() {
    this.patientService
      .create(this.patient).subscribe(data => {
        this.patient = data;
        this.patientID = this.patient.id;
        this.patient = new Patient();
        this.patientService.sendListUpdateAlert('Added');
        this.gotoList();
      },
      error => console.log(error));
  }

  onSubmit() {
    this.submitted = true;
    this.save();
  }

  gotoList() {
    this.router.navigate([ 'patients/details', this.patientID ]);
  }

  cancelAdd() {
    this.router.navigate([ 'patients' ]);
  }

}
