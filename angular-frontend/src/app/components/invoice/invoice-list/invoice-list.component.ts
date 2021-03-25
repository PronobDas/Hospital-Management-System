import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Patient } from '../../../classes/patient';
import { Invoice} from '../../../classes/invoice';
import { InvoiceService } from '../../../services/invoice.service';
import { ActivatedRoute, Router } from '@angular/router';
import {PatientService} from '../../../services/patient.service';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css']
})

export class InvoiceListComponent implements OnInit, OnDestroy {
  patients: Observable<Patient[]>;
  patientList: Patient[];
  invoices: Observable<Invoice[]>;
  subscription: Subscription;
  constructor(private invoiceService: InvoiceService,
              private patientService: PatientService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.reloadData();
    this.subscription = this.invoiceService.getListUpdateAlert().subscribe(
      (reportMessage) => {
        if (reportMessage) {
          this.reloadData();
        }
      }
    );
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  reloadData() {
    // @ts-ignore
    this.patients = this.patientService.getAll().subscribe(
      (data: Patient[]) => {
        this.patientList = data;
      }
    );
    this.invoices = this.invoiceService.getAll();
  }
  invoiceDetails(id: string) {
    this.router.navigate([ 'details', id ], { relativeTo: this.route });
  }

  addInvoice() {
    this.router.navigate([ 'add' ], { relativeTo: this.route });
  }
  getPatientName(patientID: string) {
    try {
      return this.patientList.find(p => p.id === patientID).name;
    } catch ( error ) {
      return null;
    }
    // getPatientDob(patientID: string) {
    //   try {
    //     return this.patientList.find(p => p.id === patientID).dob;
    //   } catch ( error ) {
    //     return null;
    //   }
    // }

  //   getPatientContact(patientID: string) {
  //     try {
  //       return this.patientList.find(p => p.id === patientID).contact;
  //     } catch ( error ) {
  //       return null;
  //     }
  //   }
   }
}
