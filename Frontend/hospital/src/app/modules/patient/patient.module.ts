import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientRoutingModule } from './patient-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PatientVisitDetailsComponent } from './components/patient-visit-details/patient-visit-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { FullCalendarModule } from '@fullcalendar/angular'; 
import dayGridPlugin from '@fullcalendar/daygrid'; 
import interactionPlugin from '@fullcalendar/interaction'; 
import {ScheduleModule} from '@syncfusion/ej2-angular-schedule';
import timeGridPlugin from '@fullcalendar/timegrid';

import { AppointmentComponent } from './components/appointment/appointment.component';
import { PatientVisitHistoryComponent } from './components/patient-visit-history/patient-visit-history.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AppointmentDetailsComponent } from './components/appointment-details/appointment-details.component';
import { DataCollectionAppointmentComponent } from './components/data-collection-appointment/data-collection-appointment.component';
import { AppointmentDialogComponent } from './components/appointment-dialog/appointment-dialog.component';
import { ProfileDetailsComponent } from './components/profile/profile-details/profile-details.component';
import { DemographicDetailsComponent } from './components/profile/demographic-details/demographic-details.component';
import { NomineeDetailsComponent } from './components/profile/nominee-details/nominee-details.component';
import { AllergyDetailsComponent } from './components/profile/allergy-details/allergy-details.component';
import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from 'src/app/components/shared/shared.module';

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  timeGridPlugin,
  interactionPlugin
]);
@NgModule({
  declarations: [
    DashboardComponent,
    PatientVisitDetailsComponent,
    AppointmentComponent,
    PatientVisitHistoryComponent,
    ProfileComponent,
    AppointmentDetailsComponent,
    DataCollectionAppointmentComponent,
    AppointmentDialogComponent,
    ProfileDetailsComponent,
    DemographicDetailsComponent,
    NomineeDetailsComponent,
    AllergyDetailsComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    PatientRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    FullCalendarModule,
    ScheduleModule,
    SharedModule
  ]
})
export class PatientModule { }
