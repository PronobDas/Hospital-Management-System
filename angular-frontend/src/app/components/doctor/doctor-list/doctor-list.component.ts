import { Component, OnDestroy, OnInit } from '@angular/core';
import { Doctor } from '../../../classes/doctor';
import { Observable, Subscription } from 'rxjs';
import { DoctorService } from '../../../services/doctor.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.component.html',
  styleUrls: [ './doctor-list.component.css' ]
})
export class DoctorListComponent implements OnInit, OnDestroy {
  doctors: Observable<Doctor[]>;
  doctorsByName: Observable<Doctor[]>;
  subscription: Subscription;

  constructor(private doctorService: DoctorService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.reloadData();
    this.subscription = this.doctorService.getListUpdateAlert().subscribe(
      (message) => {
        if (message) {
          this.reloadData();
        }
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


  reloadData() {
    this.doctors = this.doctorService.getAll();
    console.log(this.doctors);
  }

  doctorDetails(id: string) {
    this.router.navigate([ 'details', id ], { relativeTo: this.route });
  }

  addDoctor() {
    this.router.navigate([ 'add' ], { relativeTo: this.route });
  }

  getDoctorsByName(input: string) {
    this.doctorsByName = this.doctorService.findByName(input);
  }
}
