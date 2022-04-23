import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MatBadgeModule } from '@angular/material/badge';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from "@angular/material/dialog";
import { ReactiveFormsModule } from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction'; // a plugin!
import { ScheduleModule, DayService, WeekService, WorkWeekService, TimelineMonthService, MonthService, TimelineViewsService, MonthAgendaService, AgendaService } from '@syncfusion/ej2-angular-schedule';
import timeGridPlugin from '@fullcalendar/timegrid';
import { MatFormFieldModule } from '@angular/material/form-field'; MatInputModule
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { AppointmentComponent } from './components/appointment/appointment.component';
import { AppointmentBookDialogComponent } from './components/appointment-book-dialog/appointment-book-dialog.component';
import { DoctorRoutingModule } from './doctor-routing.module';
import { NoteDialogComponent } from './components/note-dialog/note-dialog.component';
import { NotesComponent } from './components/notes/notes.component';
import { NoteViewComponent } from './components/note-view/note-view.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PrescriptionDetailsDialogComponent } from './components/prescription-details-dialog/prescription-details-dialog.component';
import {MatMenuModule} from '@angular/material/menu';
import { AppointmentDetailsDialogComponent } from './components/appointment-details-dialog/appointment-details-dialog.component';
import { AskReasonComponent } from './components/ask-reason/ask-reason.component';
import { PatientDetailsDialogComponent } from './components/patient-details-dialog/patient-details-dialog.component';
import { PatientVisitHistoryComponent } from './components/patient-visit-history/patient-visit-history.component';

FullCalendarModule.registerPlugins([
  dayGridPlugin,
  timeGridPlugin,
  interactionPlugin
]);
@NgModule({
  declarations: [DashboardComponent, NotesComponent, NoteDialogComponent, NoteViewComponent, AppointmentBookDialogComponent, AppointmentComponent, ProfileComponent, AppointmentDetailsDialogComponent, AskReasonComponent, PatientDetailsDialogComponent,PatientVisitHistoryComponent, PrescriptionDetailsDialogComponent],
  imports: [
    CommonModule,
    DoctorRoutingModule,
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
    MatTableModule,
    MatMenuModule
  ],
  providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService, MonthAgendaService, TimelineViewsService, TimelineMonthService],
})
export class DoctorModule { }
