import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { TutorialDetailsComponent } from './components/tutorial/tutorial-details/tutorial-details.component';
import { CreateTutorialComponent } from './components/tutorial/create-tutorial/create-tutorial.component';
import { UpdateTutorialComponent } from './components/tutorial/update-tutorial/update-tutorial.component';
import { TutorialListComponent } from './components/tutorial/tutorial-list/tutorial-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { DoctorComponent } from './components/doctor/doctor.component';
import { DoctorAddComponent } from './components/doctor/doctor-add/doctor-add.component';
import { DoctorListComponent } from './components/doctor/doctor-list/doctor-list.component';
import { DoctorDetailsComponent } from './components/doctor/doctor-details/doctor-details.component';
import { DoctorEditComponent } from './components/doctor/doctor-edit/doctor-edit.component';
import { DoctorService } from './services/doctor.service';
import { PatientComponent } from './components/patient/patient.component';
import { PatientListComponent } from './components/patient/patient-list/patient-list.component';
import { PatientDetailsComponent } from './components/patient/patient-details/patient-details.component';
import { PatientEditComponent } from './components/patient/patient-edit/patient-edit.component';
import { PatientAddComponent } from './components/patient/patient-add/patient-add.component';
import { HomeComponent } from './components/home/home.component';
import { ReportComponent } from './components/report/report.component';
import { ReportListComponent } from './components/report/report-list/report-list.component';
import { ReportDetailsComponent } from './components/report/report-details/report-details.component';
import { ReportEditComponent } from './components/report/report-edit/report-edit.component';
import { ReportAddComponent } from './components/report/report-add/report-add.component';
import { PatientService } from './services/patient.service';
import { ReportService } from './services/report.service';
import { PrescriptionComponent } from './components/prescription/prescription.component';
import { DatePipe } from '@angular/common';
import { MedicineAddComponent } from './components/medicine/medicine-add/medicine-add.component';
import { MedicineEditComponent } from './components/medicine/medicine-edit/medicine-edit.component';
import { MedicineListComponent } from './components/medicine/medicine-list/medicine-list.component';
import { MedicineDetailsComponent } from './components/medicine/medicine-details/medicine-details.component';
import { MedicineComponent } from './components/medicine/medicine.component';
import { MedicineService } from './services/medicine.service';

@NgModule({
  declarations: [
    AppComponent,
    TutorialDetailsComponent,
    CreateTutorialComponent,
    UpdateTutorialComponent,
    TutorialListComponent,
    HeaderComponent,
    DoctorComponent,
    DoctorAddComponent,
    DoctorListComponent,
    DoctorDetailsComponent,
    DoctorEditComponent,
    PatientComponent,
    PatientListComponent,
    PatientDetailsComponent,
    PatientEditComponent,
    PatientAddComponent,
    HomeComponent,
    ReportComponent,
    ReportListComponent,
    ReportDetailsComponent,
    ReportEditComponent,
    ReportAddComponent,
    PrescriptionComponent,
    MedicineAddComponent,
    MedicineEditComponent,
    MedicineListComponent,
    MedicineDetailsComponent,
    MedicineComponent,
  ],
  imports: [
    RouterModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [ DoctorService, PatientService, ReportService, MedicineService, DatePipe ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
