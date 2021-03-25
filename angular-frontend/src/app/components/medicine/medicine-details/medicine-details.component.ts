import { Component, OnInit } from '@angular/core';
import { Medicine } from '../../../classes/medicine';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MedicineService } from '../../../services/medicine.service';

@Component({
  selector: 'app-medicine-details',
  templateUrl: './medicine-details.component.html',
  styleUrls: [ './medicine-details.component.css' ]
})
export class MedicineDetailsComponent implements OnInit {

  medicineId: string;
  medicine: Medicine;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private medicineService: MedicineService) {
  }

  ngOnInit(): void {
    this.medicine = new Medicine();
    this.route.params.subscribe(
      (params: Params) => {
        this.medicineId = params['id'.toString()];
        this.medicineService.getMedicine(this.medicineId).subscribe(
          medicineData => {
            this.medicine = medicineData;
          }
        );
      }
    );
  }

  deleteMedicine(id: string) {
    this.medicineService.deleteMedicine(id).subscribe(
      data => {
        this.medicineService.sendListUpdateAlert('Deleted');
      },
      error => console.log(error)
    );
    this.router.navigate([ 'medicines' ]);
  }

  updateMedicine(id: string) {
    this.router.navigate([ 'medicines/update', id ]);
  }
}
