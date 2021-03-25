import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DoctorService } from '../../../services/doctor.service';
import { Patient } from '../../../classes/patient';
import { PatientService } from '../../../services/patient.service';
import { Observable } from 'rxjs';
import { Doctor } from '../../../classes/doctor';

@Component({
  selector: 'app-patient-edit',
  templateUrl: './patient-edit.component.html',
  styleUrls: [ './patient-edit.component.css' ]
})
export class PatientEditComponent implements OnInit {

  id: string;
  Male = 'Male';
  Female = 'Female';
  patient: Patient;
  doctors: Observable<Doctor[]>;

  constructor(private route: ActivatedRoute, private router: Router,
              private doctorService: DoctorService,
              private patientService: PatientService) {
  }

  ngOnInit() {
    this.patient = new Patient();

    this.id = this.route.snapshot.params['id'.toString()];

    this.patientService.get(this.id)
      .subscribe(data => {
        this.patient = data;
      }, error => console.log(error));

    this.doctors = this.doctorService.getAll();
  }

  updatePatient() {
    this.patientService.update(this.id, this.patient).subscribe(
      data => {
        this.patient = data;
        this.patientService.sendListUpdateAlert('Updated');
        this.list();
      }, error => console.log(error)
    );
  }

  onSubmit() {
    this.updatePatient();
  }

  list() {
    this.router.navigate([ 'patients/details', this.id ]);
  }
}
