import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { AgendaService, DayService, MonthAgendaService, MonthService, ScheduleModule, TimelineMonthService, TimelineViewsService, WeekService, WorkWeekService } from '@syncfusion/ej2-angular-schedule';

import { SharedModule } from 'src/app/components/shared/shared.module';
import { MaterialModule } from 'src/app/material.module';
import { AppointmentBookDialogComponent } from './components/appointment-book-dialog/appointment-book-dialog.component';
import { AppointmentDetailsDialogComponent } from './components/appointment-details-dialog/appointment-details-dialog.component';
import { AppointmentComponent } from './components/appointment/appointment.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NoteDialogComponent } from './components/note-dialog/note-dialog.component';
import { NoteViewComponent } from './components/note-view/note-view.component';
import { NotesComponent } from './components/notes/notes.component';
import { PatientDetailsDialogComponent } from './components/patient-details-dialog/patient-details-dialog.component';
import { PatientVisitHistoryComponent } from './components/patient-visit-history/patient-visit-history.component';
import { AddDiagnosisComponent } from './components/prescription-details-dialog/add-diagnosis/add-diagnosis.component';
import { AddMedicationsComponent } from './components/prescription-details-dialog/add-medications/add-medications.component';
import { AddProceduresComponent } from './components/prescription-details-dialog/add-procedures/add-procedures.component';
import { PrescriptionDetailsDialogComponent } from './components/prescription-details-dialog/prescription-details-dialog.component';
import { DoctorRoutingModule } from './doctor-routing.module';

FullCalendarModule.registerPlugins([
  dayGridPlugin,
  timeGridPlugin,
  interactionPlugin
]);
@NgModule({
  declarations: [
    DashboardComponent,
    NotesComponent,
    NoteDialogComponent,
    NoteViewComponent,
    AppointmentBookDialogComponent,
    AppointmentComponent,
    AppointmentDetailsDialogComponent,
    PatientDetailsDialogComponent,
    PatientVisitHistoryComponent,
    PrescriptionDetailsDialogComponent,
    AddProceduresComponent,
    AddMedicationsComponent,
    AddDiagnosisComponent
  ],
  imports: [
    CommonModule,
    DoctorRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    FullCalendarModule,
    ScheduleModule,
    SharedModule
  ],
  providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService, MonthAgendaService, TimelineViewsService, TimelineMonthService],
})
export class DoctorModule { }
