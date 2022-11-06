import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PatientVisitDetailsComponent } from './components/patient-visit-details/patient-visit-details.component';
import { PatientRoutingModule } from './patient-routing.module';

import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { ScheduleModule } from '@syncfusion/ej2-angular-schedule';

import { SharedModule } from 'src/app/components/shared/shared.module';
import { MaterialModule } from 'src/app/material.module';
import { AppointmentDetailsComponent } from './components/appointment-details/appointment-details.component';
import { AppointmentDialogComponent } from './components/appointment-dialog/appointment-dialog.component';
import { AppointmentComponent } from './components/appointment/appointment.component';
import { DataCollectionAppointmentComponent } from './components/data-collection-appointment/data-collection-appointment.component';
import { PatientVisitHistoryComponent } from './components/patient-visit-history/patient-visit-history.component';
import { AllergyDetailsComponent } from './components/profile/allergy-details/allergy-details.component';
import { DemographicDetailsComponent } from './components/profile/demographic-details/demographic-details.component';
import { NomineeDetailsComponent } from './components/profile/nominee-details/nominee-details.component';
import { ProfileDetailsComponent } from './components/profile/profile-details/profile-details.component';
import { ProfileComponent } from './components/profile/profile.component';

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
