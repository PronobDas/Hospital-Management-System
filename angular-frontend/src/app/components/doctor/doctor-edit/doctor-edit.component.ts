import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Doctor } from '../../../classes/doctor';
import { DoctorService } from '../../../services/doctor.service';

@Component({
  selector: 'app-doctor-edit',
  templateUrl: './doctor-edit.component.html',
  styleUrls: [ './doctor-edit.component.css' ]
})
export class DoctorEditComponent implements OnInit {

  id: string;
  doctor: Doctor;

  constructor(private route: ActivatedRoute, private router: Router,
              private doctorService: DoctorService) {
  }

  ngOnInit() {
    this.doctor = new Doctor();

    this.id = this.route.snapshot.params['id'.toString()];

    this.doctorService.get(this.id)
      .subscribe(data => {
        console.log(data);
        this.doctor = data;
      }, error => console.log(error));
  }

  updateDoctor() {
    this.doctorService.update(this.id, this.doctor).subscribe(
      data => {
        console.log(data);
        this.doctor = new Doctor();
        this.doctorService.sendListUpdateAlert('Updated');
        this.list();
      }, error => console.log(error)
    );
  }

  onSubmit() {
    this.updateDoctor();
  }

  list() {
    this.router.navigate([ 'doctors/details', this.id ]);
  }
}
