import { Component, OnInit } from '@angular/core';
import { Patient } from '../../../classes/patient';
import { Observable } from 'rxjs';
import { Doctor } from '../../../classes/doctor';
import { PatientService } from '../../../services/patient.service';
import { DoctorService } from '../../../services/doctor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Invoice} from '../../../classes/invoice';
import { InvoiceService} from '../../../services/invoice.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Test } from '../../../classes/test';
import {TestService} from '../../../services/test.service';

@Component({
  selector: 'app-invoice-add',
  templateUrl: './invoice-add.component.html',
  styleUrls: ['./invoice-add.component.css']
})
export class InvoiceAddComponent implements OnInit {
  invoice: Invoice = new Invoice();
  submitted = false;
  invoiceId: string;
  patientId: string;
  patients: Observable<Patient[]>;
  doctors: Observable<Doctor[]>;
  patient: Patient;
  testList: string[];
  selectedTest: Test = new Test();

  invoiceForm = this.fb.group({
    patientId: [ '', Validators.required ],
    doctorId: [ '', Validators.required ],
    tests: this.fb.array([ this.buildTest() ])
  });
  reportForm: any;

  constructor(private patientService: PatientService,
              private doctorService: DoctorService,
              private invoiceService: InvoiceService,
              // tslint:disable-next-line:no-shadowed-variable
              private TestService: TestService,
              private route: ActivatedRoute,
              private router: Router,
              private fb: FormBuilder) {
  }
  get tests() {
    return this.reportForm.get('tests') as FormArray;
  }
  addTests() {
    this.tests.push(this.buildTest());
  }

  removeTests(i: number) {
    this.tests.removeAt(i);
  }

  ngOnInit() {
    this.doctors = this.doctorService.getAll();
    this.patients = this.patientService.getAll();
    this.testList = this.invoiceService.getTests();
    this.patientId = this.route.snapshot.params['id'.toString()];
    this.patient = new Patient();
    if (this.patientId) {
      try {
        this.patientService.get(this.patientId).subscribe(
          patientData => {
            this.patient = patientData;
            this.reportForm.patchValue({
              patientId: this.patient.id,
              doctorId: this.patient.doctorid
            });
            console.log(this.patient);
          }
        );
      } catch ( e ) {
        console.log('Failed to load patient data');
      }
    }
  }

  save() {
    this.invoice = this.reportForm.value;
    this.invoiceService
      .create(this.invoice).subscribe(invoiceData => {
        this.invoice = invoiceData;
        this.invoiceId = this.invoice.id;
        this.invoice = new Invoice();
        this.invoiceService.sendListUpdateAlert('Added');
        this.gotoList();
      },
      error => console.log(error));
  }

  onSubmit() {
    this.submitted = true;
    this.save();
  }
  setTest(index: string) {
    this.TestService.getTest(index).subscribe(
      testData => {
        this.selectedTest = testData;
        console.log(this.selectedTest);
      }
    );
  }

  gotoList() {
    this.router.navigate([ 'invoices/details', this.invoiceId ]);
  }

  cancelAdd() {
    this.router.navigate([ 'invoices' ]);
  }

  // Build Test form
  private buildTest(): FormGroup {
    return this.fb.group({
      testName: [ '', Validators.required ],
      description: [ '', Validators.required ],
      sampleName: [ '', Validators.required ],
      unitPrice: [ '', Validators.required ]
    });
  }
}
