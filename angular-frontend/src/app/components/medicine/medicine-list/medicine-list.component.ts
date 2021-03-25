import { Component, OnDestroy, OnInit } from '@angular/core';
import { MedicineService } from '../../../services/medicine.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Medicine } from '../../../classes/medicine';

@Component({
  selector: 'app-medicine-list',
  templateUrl: './medicine-list.component.html',
  styleUrls: [ './medicine-list.component.css' ]
})
export class MedicineListComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  medicines: Observable<Medicine[]>;

  constructor(private medicineService: MedicineService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.reloadData();
    this.subscription = this.medicineService.getListUpdateAlert().subscribe(
      (message) => {
        if (message) {
          this.reloadData();
        }
      }
    );
  }

  reloadData() {
    this.medicines = this.medicineService.getAllMedicine();
  }

  medicineDetails(id: string) {
    this.router.navigate([ 'details', id ], { relativeTo: this.route });
  }

  addMedicine() {
    this.router.navigate([ 'add' ], { relativeTo: this.route });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
