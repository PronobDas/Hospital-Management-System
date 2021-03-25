import { Component, OnInit } from '@angular/core';
import { Report } from '../../../classes/report';
import { Observable } from 'rxjs';
import { Patient } from '../../../classes/patient';
import { Doctor } from '../../../classes/doctor';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PatientService } from '../../../services/patient.service';
import { DoctorService } from '../../../services/doctor.service';
import { ReportService } from '../../../services/report.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Medicine } from '../../../classes/medicine';
import { MedicineService } from '../../../services/medicine.service';

@Component({
  selector: 'app-report-edit',
  templateUrl: './report-edit.component.html',
  styleUrls: [ './report-edit.component.css' ]
})
export class ReportEditComponent implements OnInit {
  report: Report = new Report();
  reportID: string;
  patientID: string;
  patients: Observable<Patient[]>;
  doctors: Observable<Doctor[]>;
  allergyList: string[];
  disabilityList: string[];
  medicineList: Observable<Medicine[]>;
  dietList: string[];

  // Build Report Form
  reportForm = this.fb.group({
    patientid: [ '', Validators.required ],
    doctorid: [ '', Validators.required ],
    bloodpressure: [ '', Validators.required ],
    pulserate: [ '', Validators.required ],
    weight: [ '', Validators.required ],
    allergies: this.fb.array([
      this.fb.control('')
    ]),
    disabilities: this.fb.array([
      this.fb.control('')
    ]),
    medicines: this.fb.array([]),
    diets: this.fb.array([]),
    patienthistory: [ '', Validators.required ],
    followupdoctorid: [ '', Validators.required ]
  });

  constructor(private patientService: PatientService,
              private doctorService: DoctorService,
              private reportService: ReportService,
              private medicineService: MedicineService,
              private route: ActivatedRoute,
              private router: Router,
              private fb: FormBuilder) {
  }

  // Form array functions

  get allergies() {
    return this.reportForm.get('allergies') as FormArray;
  }

  get disabilities() {
    return this.reportForm.get('disabilities') as FormArray;
  }

  get medicines() {
    return this.reportForm.get('medicines') as FormArray;
  }

  get diets() {
    return this.reportForm.get('diets') as FormArray;
  }

  addAllergies() {
    this.allergies.push(this.fb.control(''));
  }

  removeAllergies(i: number) {
    this.allergies.removeAt(i);
  }

  addDisabilities() {
    this.disabilities.push(this.fb.control(''));
  }

  removeDisabilities(i: number) {
    this.disabilities.removeAt(i);
  }

  addMedicines() {
    this.medicines.push(this.buildMedicine());
  }

  removeMedicines(i: number) {
    this.medicines.removeAt(i);
  }

  addDiets() {
    this.diets.push(this.buildDiet());
  }

  removeDiets(i: number) {
    this.diets.removeAt(i);
  }

  // Form array functions

  // Regular Component functions
  ngOnInit() {
    this.doctors = this.doctorService.getAll();
    this.patients = this.patientService.getAll();
    this.allergyList = this.reportService.getAllergies();
    this.disabilityList = this.reportService.getDisabilities();
    this.medicineList = this.medicineService.getAllMedicine();
    this.dietList = this.reportService.getDiets();
    this.reportID = this.route.snapshot.params['id'.toString()];
    this.reportService.get(this.reportID).subscribe(
      reportData => {
        this.report = reportData;
        this.reportForm.patchValue({
          patientid: this.report.patientid,
          doctorid: this.report.doctorid,
          bloodpressure: this.report.bloodpressure,
          pulserate: this.report.pulserate,
          weight: this.report.weight,
          patienthistory: this.report.patienthistory,
          followupdoctorid: this.report.followupdoctorid
        });
        this.reportForm.setControl('allergies', this.fb.array(this.report.allergies || []));
        this.reportForm.setControl('disabilities', this.fb.array(this.report.disabilities || []));
        if (this.report.medicines) {
          for (const medicine of this.report.medicines) {
            this.medicines.push(
              new FormGroup({
                drugname: new FormControl(medicine.drugname, Validators.required),
                unit: new FormControl(medicine.unit, Validators.required),
                dosage: new FormControl(medicine.dosage, Validators.required),
              })
            );
          }
        }

        if (this.report.diets) {
          for (const diet of this.report.diets) {
            this.diets.push(
              new FormGroup({
                dietname: new FormControl(diet.dietname, Validators.required),
                description: new FormControl(diet.description, Validators.required)
              })
            );
          }
        }
      }
    );
  }

  update() {
    this.report = this.reportForm.value;
    this.reportService
      .update(this.reportID, this.report).subscribe(reportData => {
        this.report = reportData;
        this.reportService.sendListUpdateAlert('Updated');
        this.gotoList();
      },
      error => console.log(error));
  }

  onSubmit() {
    this.update();
  }

  gotoList() {
    this.router.navigate([ 'reports/details', this.reportID ]);
  }

  cancelAdd() {
    this.router.navigate([ 'reports' ]);
  }

  // Build Medicine form
  private buildMedicine(): FormGroup {
    return this.fb.group({
      drugname: [ '', Validators.required ],
      unit: [ '', Validators.required ],
      dosage: [ '', Validators.required ],
    });
  }

  // Build Diet form
  private buildDiet(): FormGroup {
    return this.fb.group({
      dietname: [ '', Validators.required ],
      description: [ '', Validators.required ],
    });
  }
}
