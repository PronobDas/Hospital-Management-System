import { Component, OnInit } from '@angular/core';
import { Medicine } from '../../../classes/medicine';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MedicineService } from '../../../services/medicine.service';

@Component({
  selector: 'app-medicine-edit',
  templateUrl: './medicine-edit.component.html',
  styleUrls: [ './medicine-edit.component.css' ]
})
export class MedicineEditComponent implements OnInit {
  medicine: Medicine = new Medicine();
  medicineId: string;

  medicineForm = this.fb.group({
    drugname: [ '', Validators.required ],
    unit: [ '', Validators.required ],
    dosage: [ '', Validators.required ],
  });

  constructor(private medicineService: MedicineService,
              private route: ActivatedRoute,
              private router: Router,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.medicineId = this.route.snapshot.params['id'.toString()];
    this.medicineService.getMedicine(this.medicineId).subscribe(
      medicineData => {
        this.medicine = medicineData;
        console.log(this.medicine);
        this.medicineForm.patchValue({
          drugname: this.medicine.drugname,
          unit: this.medicine.unit,
          dosage: this.medicine.dosage
        });
      }
    );
  }

  update() {
    this.medicine = this.medicineForm.value;
    this.medicineService.updateMedicine(this.medicineId, this.medicine).subscribe(
      medicineData => {
        this.medicine = medicineData;
        this.medicineService.sendListUpdateAlert('Updated');
        this.goToList();
      }, error => console.log(error)
    );
  }

  onSubmit() {
    this.update();
  }

  goToList() {
    this.router.navigate([ 'medicines/details', this.medicineId ]);
  }

  cancelAdd() {
    this.router.navigate([ 'medicines' ]);
  }
}
