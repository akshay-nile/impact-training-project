import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientRoutingModule } from './patient-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EmergencyContactInfoComponent } from './components/emergencycontactinfo/emergencycontactinfo.component';
import { DemographicsComponent } from './components/demographics/demographics.component';
import { PatientVisitDetailsComponent } from './components/patient-visit-details/patient-visit-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { MatBadgeModule } from '@angular/material/badge';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSnackBarModule} from '@angular/material/snack-bar';

import {MatDialogModule} from "@angular/material/dialog";


import { FullCalendarModule } from '@fullcalendar/angular'; 
import dayGridPlugin from '@fullcalendar/daygrid'; 
import interactionPlugin from '@fullcalendar/interaction'; // a plugin!
import {ScheduleModule, DayService, WeekService, WorkWeekService,TimelineMonthService, MonthService,TimelineViewsService,MonthAgendaService, AgendaService } from '@syncfusion/ej2-angular-schedule';
import timeGridPlugin from '@fullcalendar/timegrid';
import { MatFormFieldModule } from '@angular/material/form-field';MatInputModule
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { AppointmentComponent } from './components/appointment/appointment.component';
import { PatientVisitHistoryComponent } from './components/patient-visit-history/patient-visit-history.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AppointmentDetailsComponent } from './components/appointment-details/appointment-details.component';
import { DataCollectionAppointmentComponent } from './components/data-collection-appointment/data-collection-appointment.component';
import { AppointmentDialogComponent } from './components/appointment-dialog/appointment-dialog.component';
import { ProfileDetailsComponent } from './components/profile/profile-details/profile-details.component';
import { DemographicDetailsComponent } from './components/profile/demographic-details/demographic-details.component';
import { NomineeDetailsComponent } from './components/profile/nominee-details/nominee-details.component';
import { ChangePasswordComponent } from './components/profile/change-password/change-password.component';

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  timeGridPlugin,
  interactionPlugin
]);
@NgModule({
  declarations: [
    DashboardComponent,
    EmergencyContactInfoComponent,
    DemographicsComponent,
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
    ChangePasswordComponent
  ],
  imports: [
    CommonModule,
    PatientRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatBadgeModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTabsModule,
    MatDialogModule,
    ReactiveFormsModule,
    FullCalendarModule,
    ScheduleModule,
    MatSnackBarModule,
    MatBadgeModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatPaginatorModule,
    MatTableModule
  ]
})
export class PatientModule { }
