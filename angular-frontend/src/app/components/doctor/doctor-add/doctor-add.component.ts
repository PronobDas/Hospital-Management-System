import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Doctor } from '../../../classes/doctor';
import { DoctorService } from '../../../services/doctor.service';

@Component({
  selector: 'app-doctor-add',
  templateUrl: './doctor-add.component.html',
  styleUrls: [ './doctor-add.component.css' ]
})
export class DoctorAddComponent implements OnInit {
  doctor: Doctor = new Doctor();
  submitted = false;
  doctorID: string;

  constructor(private doctorService: DoctorService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
  }

  save() {
    this.doctorService
      .create(this.doctor).subscribe(data => {
        console.log(data);
        this.doctor = data;
        this.doctorID = this.doctor.id;
        console.log(this.doctorID);
        this.doctor = new Doctor();
        this.doctorService.sendListUpdateAlert('Added');
        console.log(this.doctor);
        this.gotoList();
      },
      error => console.log(error));
  }

  onSubmit() {
    this.submitted = true;
    this.save();
  }

  gotoList() {
    this.router.navigate([ 'doctors/details', this.doctorID ]);
  }

  cancelAdd() {
    this.router.navigate([ 'doctors' ]);
  }

}
